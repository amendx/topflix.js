<template>
  <div>
    <div v-bind:key="movie.id" v-for="movie in movies">
      <MovieDetailsCard
        v-bind:movie="movie"
        v-on:del-movie="$emit('del-movie', movie.id)"
        v-on:add-favorite="$emit('add-favorite', movie.id)"
      />
    </div>
  </div>
</template>

<script>
import MovieDetailsCard from "@/components/MovieDetailsCard.vue";
export default {
  name: "DetailsPage",
  data() {
    return {};
  },
  components: {
    MovieDetailsCard
  },
  props: ["movies"]
};
</script>

<style scoped>
</style>
