<template>
  <div class="navbar">
    <router-link to="/">TOPFLIX |</router-link>
    <router-link to="/">Home</router-link>
    <router-link to="/movies">Filmes</router-link>
    <router-link to="/favorites">Favoritos</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.navbar {
  overflow: hidden;
  background-color: #333;
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  margin-left: -0.5em;

  a {
    float: left;
    display: block;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
    &:hover {
      background: #ddd;
      color: black;
    }
  }
}
</style>