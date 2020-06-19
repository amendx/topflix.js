<template>
  <div>
    FILMES:
    <hr />
    <MoviesList v-bind:movies="updatedMovies" v-on:del-movie="deleteMovie" />
    <hr />SERIES
    <hr />
    <MoviesList v-bind:movies="updatedSeries" v-on:del-movie="deleteSerie" />
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
      favoriteSeries: [],
      movies: [],
      updatedMovies: [],
      updatedSeries: [],
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
      this.favoriteSeries = [
        ...new Set(localStorage.getItem("favoriteSeries").split(","))
      ];

      this.favoriteMovies.forEach(movie => {
        this.getMoviesById(Number(movie));
      });
      this.favoriteSeries.forEach(movie => {
        this.getSeriesById(Number(movie));
      });
    },

    deleteMovie(id) {
      this.updatedMovies = this.updatedMovies.filter(movie => movie.id !== id);
      const updatedMoviesId = this.updatedMovies.map(
        movie => (movie = movie.id)
      );
      localStorage.setItem("favoriteMovies", updatedMoviesId);
    },
    deleteSerie(id) {
      this.updatedSeries = this.updatedSeries.filter(serie => serie.id !== id);
      const updatedSeriesId = this.updatedSeries.map(
        serie => (serie = serie.id)
      );
      localStorage.setItem("favoriteSeries", updatedSeriesId);
    },
    getMoviesById(id) {
      axios
        .get(
          `${this.baseURL}/movie/${id}?api_key=${this.moviedbKEY}&language=pt-BR`
        )
        .then(response => this.updatedMovies.push(response.data));
    },
    getSeriesById(id) {
      axios
        .get(
          `${this.baseURL}/tv/${id}?api_key=${this.moviedbKEY}&language=pt-BR`
        )
        .then(response => this.updatedSeries.push(response.data));
    }
  }
};
</script>

<style>
</style>