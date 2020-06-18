<template>
  <div>
    <MoviesList v-bind:movies="newMovies" v-on:del-movie="deleteMovie" />
  </div>
</template>

<script>
import MoviesList from "@/components/MoviesList.vue";
import axios from "axios";
export default {
  name: "Movies",
  data() {
    return {
      favoriteMovies: [],
      movies: [],
      newMovies: [],
      counter: 1,
      baseURL: "https://api.themoviedb.org/3",
      moviedbKEY: "533bf9a3f2e9acf633932e225a72339e",
      fullUrl: this.baseURL
    };
  },
  components: {
    MoviesList
  },
  mounted() {
    this.getFavorites();
  },
  methods: {
    getFavorites() {
      this.favoriteMovies = [
        ...new Set(localStorage.getItem("favoriteMovies").split(","))
      ];
      this.favoriteMovies.forEach(movie => {
        this.getMoviesById(Number(movie));
      });
    },
    deleteMovie(id) {
      this.newMovies = this.newMovies.filter(movie => movie.id !== id);
      console.log(`new movies delete [${id}] -> `, this.newMovies);
      const updatedFavoriteList = this.newMovies.map(
        movie => (movie = movie.id)
      );
      localStorage.setItem("favoriteMovies", updatedFavoriteList);
    },
    getMoviesById(id) {
      axios
        .get(
          `${this.baseURL}/movie/${id}?api_key=${this.moviedbKEY}&language=pt-BR`
        )
        .then(response => this.newMovies.push(response.data));
    }
  }
};
</script>

<style>
</style>