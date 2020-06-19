<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>
<script>
import Header from "@/components/Header";
export default {
  components: { Header }
};
</script>
<style lang="scss">
@import url(//fonts.googleapis.com/css2?family=Montserrat);

#app {
  margin-top: 5em;
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  background: rgb(2, 0, 36);
  background: linear-gradient(
    169deg,
    rgb(8, 6, 58) 13%,
    rgba(44, 44, 65, 1) 48%,
    rgb(5, 84, 100) 100%
  );
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
