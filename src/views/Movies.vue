<template>
  <div class="container">
    <button v-on:click="filterMoviesByDate('acs')">Mais Antigo</button>
    <button v-on:click="filterMoviesByDate('desc')">Mais Recente</button>
    <hr />
    <button @click="searchBy('movie')" class="movie-card__button--favorite">Filmes</button> |
    <button @click="searchBy('tv')" class="movie-card__button--detail">Séries</button>
    <hr />
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
#snackbar {
  visibility: hidden; /* Hidden by default. Visible on click */
  min-width: 250px; /* Set a default minimum width */
  margin-left: -125px; /* Divide value of min-width by 2 */
  background-color: #333; /* Black background color */
  color: #fff; /* White text color */
  text-align: center; /* Centered text */
  border-radius: 2px; /* Rounded borders */
  padding: 16px; /* Padding */
  position: fixed; /* Sit on top of the screen */
  z-index: 1; /* Add a z-index if needed */
  left: 50%; /* Center the snackbar */
  bottom: 30px; /* 30px from the bottom */
}

/* Show the snackbar when clicking on a button (class added with JavaScript) */
#snackbar.show {
  visibility: visible; /* Show the snackbar */
  /* Add animation: Take 0.5 seconds to fade in and out the snackbar.
  However, delay the fade out process for 2.5 seconds */
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

/* Animations to fade the snackbar in and out */
@-webkit-keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@-webkit-keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}
</style>