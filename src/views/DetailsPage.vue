<template>
  <div>
    <MovieDetailsCard
      v-bind:movie="currentMovie"
      v-bind:src="baseIMG"
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
      type: this.$route.params.type,
      currentMovie: [],
      baseURL: "https://api.themoviedb.org/3",
      baseIMG: "https://image.tmdb.org/t/p/original",
      moviedbKEY: "533bf9a3f2e9acf633932e225a72339e"
    };
  },
  components: {
    MovieDetailsCard
  },
  mounted() {
    console.log("this ROUNT", this.type);
    this.getMoviesById(this.id);
  },
  methods: {
    getMoviesById(id) {
      if (id !== 0)
        axios
          .get(
            `${this.baseURL}/${this.type}/${id}?api_key=${this.moviedbKEY}&include_video=true&language=pt-BR`
          )
          .then(response => (this.currentMovie = response.data));
    }
  },
  props: ["movies"]
};
</script>

<style scoped>
</style>
