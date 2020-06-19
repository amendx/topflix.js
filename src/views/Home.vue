<template>
  <div class="home"></div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  data() {
    return {
      movies: []
    };
  },
  mounted() {
    localStorage.getItem("favoriteMovies") === undefined
      ? localStorage.setItem("favoriteMovies", "")
      : "";
    localStorage.getItem("favoriteSeries") === undefined
      ? localStorage.setItem("favoriteSeries", "")
      : "";
  },
  methods: {}
};
</script>
