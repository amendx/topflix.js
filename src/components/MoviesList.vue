<template>
  <div>
    <div v-bind:key="movie.id" v-for="movie in movies">
      <MovieCard
        v-bind:movie="movie"
        v-on:del-movie="$emit('del-movie', movie.id)"
        v-on:detail-movie="$emit('detail-movie', movie.id)"
        v-on:add-favorite="$emit('add-favorite', movie.id)"
      />
    </div>
  </div>
</template>

<script>
import MovieCard from "./MovieCard.vue";
export default {
  name: "MoviesList",
  data() {
    return {};
  },
  components: {
    MovieCard
  },
  props: ["movies"]
};
</script>

<style scoped>
</style>

