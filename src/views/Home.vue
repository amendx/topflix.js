<template>
  <div class="home">
    <CarrouselCard v-bind:movies="movies" v-bind:src="baseIMG" />
  </div>
</template>

<script>
import CarrouselCard from "@/components/CarrouselCard";
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      movies: [],
      baseURL: "https://api.themoviedb.org/3",
      baseIMG: "https://image.tmdb.org/t/p/original",
      posterPath: "http://image.tmdb.org/t/p/w500",
      moviedbKEY: "533bf9a3f2e9acf633932e225a72339e",
      fullUrl: this.baseURL
    };
  },
  components: { CarrouselCard },
  mounted() {
    localStorage.getItem("favoriteMovies") === undefined
      ? localStorage.setItem("favoriteMovies", "")
      : "";
    localStorage.getItem("favoriteSeries") === undefined
      ? localStorage.setItem("favoriteSeries", "")
      : "";
    this.getPopularMovies();
  },
  methods: {
    getPopularMovies() {
      axios
        .get(
          `${this.baseURL}/discover/movie?api_key=${this.moviedbKEY}&language=pt-BR&sort_by=popularity.desc`
        )
        .then(response => {
          this.movies = response.data.results.slice(0, 10);
        });
    }
  }
};
</script>
<style>
</style>
