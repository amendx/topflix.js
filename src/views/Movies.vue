<template>
  <div class="container">
    <button @click="searchBy('movie')" class="movie-card__button--favorite">Filmes</button> |
    <button @click="searchBy('tv')" class="movie-card__button--detail">Séries</button>
    <hr />
    <MoviesList
      v-bind:movies="movies"
      v-on:detail-movie="detailMovie"
      v-on:add-favorite="addFavorite"
    />
    <hr />
    <button v-on:click="nextPage">Proxima Página</button>
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
      type: "movie",
      baseURL: "https://api.themoviedb.org/3",
      moviedbKEY: "533bf9a3f2e9acf633932e225a72339e",
      fullUrl: this.baseURL
    };
  },
  mounted() {
    this.getPopularMovies();
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
    getFavorites() {
      this.favoriteMovies = [
        ...new Set(localStorage.getItem("favoriteMovies").split(","))
      ];
      this.favoriteSeries = [
        ...new Set(localStorage.getItem("favoriteSeries").split(","))
      ];
    },
    detailMovie(id) {
      console.log("detail movie", id);
      this.$router.push("/details/" + id);
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

    nextPage() {
      this.counter += 1;
      axios
        .get(
          `${this.baseURL}/discover/${this.type}?api_key=${this.moviedbKEY}&language=pt-BR&page=${this.counter}`
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
</style>