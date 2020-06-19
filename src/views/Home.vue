<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      movies: []
    };
  },
  components: {},
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
