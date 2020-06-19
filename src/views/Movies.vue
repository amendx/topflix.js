<template>
  <div class="movies">
    <div class="movies__actions">
      <ul>
        <li>
          <button class="minutes" v-on:click="filterMoviesByDate('acs')">Mais Antigo</button>
          <!-- <span class="minutes" @click="favoriteMovie(movie.id)">{{ actionText}}</span> -->
        </li>

        <li>
          <button class="minutes" v-on:click="filterMoviesByDate('desc')">Mais Recente</button>
          <!-- <span class="minutes">Nota: {{movie.vote_average}}</span> -->
        </li>
        <li>
          <!-- <span class="minutes">Tempo: {{movie.runtime }} minutos</span> -->
        </li>
      </ul>

      <!-- <button v-on:click="filterMoviesByDate('desc')">Mais Recente</button> -->
      <button @click="searchBy('movie')" class="movie-card__button--favorite">Filmes</button> |
      <button @click="searchBy('tv')" class="movie-card__button--detail">Séries</button>
    </div>
    <MoviesList
      v-bind:movies="movies"
      v-bind:src="baseIMG"
      v-bind:poster="posterPath"
      v-bind:isFavorite="false"
      v-on:detail-movie="detailMovie"
      v-on:add-favorite="addFavorite"
    />
    <hr />
    <button v-on:click="nextPage">Próxima Página</button>
    <!-- <CarrouselCard v-bind:movies="movies" v-bind:src="baseIMG" /> -->
  </div>
</template>

<script>
// import CarrouselCard from "@/components/CarrouselCard";
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
      actionText: "",
      genreNames: [],
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
  computed() {
    this.getGenres();
  },
  methods: {
    searchBy(type) {
      this.type = type;
      this.getPopularMovies();
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
          this.movies.forEach(movie => {
            this.genreNames = movie.genre_ids.map(
              id => this.genres.find(genre => genre.id === id).name
            );
            movie["genre_ids"] = this.genreNames;
          });
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
    }
  },
  components: {
    MoviesList
    // CarrouselCard
  }
};
</script>

<style lang="scss" scoped>
</style>