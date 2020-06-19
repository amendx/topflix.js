<template>
  <div>
    <MovieDetailsCard
      v-bind:movie="currentMovie"
      v-on:del-movie="$emit('del-movie', currentMovie.id)"
      v-on:add-favorite="$emit('add-favorite', currentMovie.id)"
    />
  </div>
</template>

<script>
import MovieDetailsCard from "@/components/MovieDetailsCard.vue";
import axios from "axios";
export default {
  name: "DetailsPage",
  data() {
    return {
      id: this.$route.params.id,
      currentMovie: [],
      baseURL: "https://api.themoviedb.org/3",
      moviedbKEY: "533bf9a3f2e9acf633932e225a72339e"
    };
  },
  components: {
    MovieDetailsCard
  },
  mounted() {
    this.getMoviesById(this.id);
  },
  methods: {
    getMoviesById(id) {
      if (id !== 0)
        axios
          .get(
            `${this.baseURL}/movie/${id}?api_key=${this.moviedbKEY}&language=pt-BR`
          )
          .then(response => (this.currentMovie = response.data));
    }
  },
  props: ["movies"]
};
</script>

<style scoped>
</style>
