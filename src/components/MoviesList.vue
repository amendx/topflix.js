<template>
  <div>
    <div v-bind:key="movie.id" v-for="movie in movies">
      <MovieCard
        v-bind:movie="movie"
        v-bind:src="src"
        v-bind:poster="poster"
        v-bind:isFavorite="isFavorite"
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
  props: ["movies", "src", "poster", "isFavorite"]
};
</script>

<style scoped>
</style>

