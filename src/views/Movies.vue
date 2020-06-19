<template>
  <div class="movies">
    <ul class="movies__actions">
      <li>
        <span
          class="movies__buttons"
          v-on:click="filterMoviesByDate('acs'); orderBy('asc')"
        >Mais Antigo</span>
      </li>

      <li>
        <span
          class="movies__buttons"
          v-on:click="filterMoviesByDate('desc'); orderBy('desc');"
        >Mais Recente</span>
      </li>
      <li>
        <span @click="searchBy('movie'); activate('movie')" class="movies__buttons">Filmes</span>
      </li>
      <li>
        <span @click="searchBy('tv'); activate('tv')" class="movies__buttons">Séries</span>
      </li>
    </ul>
    <ul class="movies__pagination">
      <li>
        <span @click="lastPage" class="movies__buttons">Voltar Página</span> |
        <span @click="nextPage" class="movies__buttons">Próxima Página</span>
      </li>
      <li>
        <span class="movies__buttons">Página: {{counter}}</span>
      </li>
    </ul>
    <span class="movies__type">{{programType}} - {{ordered}}</span>
    <div class="movies__list">
      <MoviesList
        v-bind:movies="movies"
        v-bind:src="baseIMG"
        v-bind:poster="posterPath"
        v-bind:isFavorite="false"
        v-on:detail-movie="detailMovie"
        v-on:add-favorite="addFavorite"
      />
    </div>
  </div>
</template>

<script>
import MoviesList from "@/components/MoviesList.vue";
import axios from "axios";
export default {
  name: "Movies",
  data() {
    return {
      movies: [],
      favoriteMovies: [],
      favoriteSeries: [],
      counter: 1,
      genres: [],
      ordered: "Últimos Lançamentos",
      actionText: "",
      programType: "Filmes",
      genreNames: [],
      activeTv: false,
      activeMovie: false,
      type: "movie",
      baseURL: "https://api.themoviedb.org/3",
      baseIMG: "https://image.tmdb.org/t/p/original",
      posterPath: "http://image.tmdb.org/t/p/w500",
      moviedbKEY: "533bf9a3f2e9acf633932e225a72339e",
      fullUrl: this.baseURL
    };
  },
  mounted() {
    this.getPopularMovies();
    this.getGenres();
  },

  watch: {
    movies() {
      this.getPopularMovies();
    }
  },

  methods: {
    searchBy(type) {
      this.type = type;
      this.getPopularMovies();
    },
    activate(type) {
      console.log("type", type);
      type === "tv"
        ? ((this.programType = "Series"), (this.ordered = "Mais Votadas"))
        : ((this.programType = "Filmes"), (this.ordered = "Mais Votados"));
    },

    orderBy(sort) {
      sort === "asc"
        ? (this.ordered = "Mais Antigos")
        : (this.ordered = "Mais Recentes");
    },

    addFavorite(id) {
      this.getFavorites();
      if (this.type === "movie") {
        this.favoriteMovies.push(id);
        localStorage.setItem("favoriteMovies", this.favoriteMovies);
      } else if (this.type === "tv") {
        this.favoriteSeries.push(id);
        localStorage.setItem("favoriteSeries", this.favoriteSeries);
      }
    },

    getGenres() {
      axios
        .get(
          `${this.baseURL}/genre/${this.type}/list?api_key=${this.moviedbKEY}&language=pt-BR`
        )
        .then(response => {
          this.genres = response.data.genres;
        });
    },
    getFavorites() {
      this.favoriteMovies = [
        ...new Set(localStorage.getItem("favoriteMovies").split(","))
      ];
      this.favoriteSeries = [
        ...new Set(localStorage.getItem("favoriteSeries").split(","))
      ];
    },
    detailMovie(id) {
      this.$router.push(`/details/${this.type}/` + id);
    },
    getPopularMovies() {
      axios
        .get(
          `${this.baseURL}/discover/${this.type}?api_key=${this.moviedbKEY}&language=pt-BR&sort_by=popularity.desc`
        )
        .then(response => {
          this.movies = response.data.results.slice(0, 10);
          this.movies.forEach(movie => {
            if (movie !== undefined)
              if (movie !== undefined)
                this.genreNames = movie.genre_ids.map(
                  id => this.genres.find(genre => genre.id === id).name
                );
            movie["genre_ids"] = this.genreNames;
          });
        });
    },
    filterMoviesByDate(filter) {
      axios
        .get(
          `${this.baseURL}/discover/${this.type}?api_key=${this.moviedbKEY}&language=pt-BR&sort_by=popularity.desc&sort_by=release_date.${filter}`
        )
        .then(response => {
          this.movies = response.data.results.slice(0, 10);
        });
    },

    nextPage() {
      this.counter += 1;
      axios
        .get(
          `${this.baseURL}/discover/${this.type}?api_key=${this.moviedbKEY}&language=pt-BR&page=${this.counter}&sort_by=popularity.desc`
        )
        .then(response => {
          this.movies = response.data.results.slice(0, 10);
        });
    },
    lastPage() {
      if (this.counter > 1) this.counter -= 1;
      if (this.counter >= 1)
        axios
          .get(
            `${this.baseURL}/discover/${this.type}?api_key=${this.moviedbKEY}&language=pt-BR&page=${this.counter}&sort_by=popularity.desc`
          )
          .then(response => {
            this.movies = response.data.results.slice(0, 10);
          });
    }
  },

  components: {
    MoviesList
  }
};
</script>

<style lang="scss" scoped>
.movies {
  .movies__type {
    font-size: 24px;
    color: #fff;
  }

  .movies__pagination {
    display: flex;
    list-style: none;
    flex-direction: column;
    align-items: center;
    & .movies__buttons {
      display: inline-block;
      color: #fff;
      padding: 5px;
      border-radius: 5px;
      cursor: pointer;
      border: 1px solid rgba(255, 255, 255, 0.13);
      &:last-of-type {
        margin-top: 0.5em;
      }
      &:hover {
        transition: color 0.3s;
        background-color: rgba(255, 255, 255, 0.13);
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
  .movies__actions {
    height: 10%;
    padding-left: 15px;
    padding-bottom: 20px;
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0;
    li {
      color: rgba(255, 255, 255, 0.4);
      transition: color 0.3s;
      transition-delay: 0.15s;
      margin: 0 10px;
      & > .movies__buttons {
        display: inline-block;
        color: #fff;
        padding: 5px;
        border-radius: 5px;
        cursor: pointer;
        border: 1px solid rgba(255, 255, 255, 0.13);
        &:hover {
          transition: color 0.3s;
          background-color: rgba(255, 255, 255, 0.13);
          color: rgba(255, 255, 255, 0.8);
        }
        &--clicked {
          background-color: red;
        }
      }
    }
  }
}
</style>