<template>
  <div class="carrousel">
    <div class="carrousel__item">
      <div class="carrousel__card" v-bind:key="movie.id" v-for="movie in movies">
        <img class="carrousel__image" :src="movie.backdrop_path" @click="detailMovie(movie.id)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CarrouselCard",
  data() {
    return {
      defaultImage:
        "https://previews.123rf.com/images/guru3d/guru3d1505/guru3d150503778/39830496-3d-red-text-default-on-a-white-background-the-film-strip.jpg"
    };
  },
  props: ["movies", "src"],
  watch: {
    movies() {
      this.movies.forEach(movie => {
        if (movie.backdrop_path === null)
          movie["backdrop_path"] = this.defaultImage;
        else if (movie.backdrop_path === undefined)
          movie["backdrop_path"] = this.defaultImage;
        else if (movie.backdrop_path !== null)
          movie["backdrop_path"] = this.src + movie.backdrop_path;
      });
    }
  }
};
</script>

<style scoped lang="scss">
.carrousel {
  width: 600px;
  text-align: center;
  overflow: hidden;
}

.carrousel__item {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: black;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  & > .carrousel__card {
    scroll-snap-align: start;
    flex-shrink: 0;
    width: 600px;
    height: 300px;
    margin-right: 50px;
    border-radius: 10px;
    background: #eee;
    transform-origin: center center;
    transform: scale(1);
    transition: transform 0.5s;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 100px;
  }
}

.carrousel__image {
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>