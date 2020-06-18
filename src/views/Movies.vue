<template>
  <div class="container">
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
      counter: 1,
      baseURL: "https://api.themoviedb.org/3",
      moviedbKEY: "533bf9a3f2e9acf633932e225a72339e",
      fullUrl: this.baseURL
    };
  },
  mounted() {
    this.getPopularMovies();
  },

  methods: {
    addFavorite(id) {
      this.getFavorites();
      this.favoriteMovies.push(id);
      localStorage.setItem("favoriteMovies", this.favoriteMovies);
    },
    getFavorites() {
      this.favoriteMovies = [
        ...new Set(localStorage.getItem("favoriteMovies").split(","))
      ];
    },
    detailMovie(id) {
      console.log("detail movie", id);
    },
    getPopularMovies() {
      axios
        .get(
          `${this.baseURL}/discover/movie?api_key=${this.moviedbKEY}&language=pt-BR&sort_by=popularity.desc`
        )
        .then(response => {
          console.log("reponses", response);
          this.movies = response.data.results.slice(0, 10);
        });
    },

    nextPage() {
      this.counter += 1;
      axios
        .get(
          `${this.baseURL}/discover/movie?api_key=${this.moviedbKEY}&language=pt-BR&page=${this.counter}`
        )
        .then(response => {
          console.log("reponses", response);
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