<template>
  <div class="carrousel">
    <div class="carrousel__item">
      <div class="carrousel__card" v-bind:key="movie.id" v-for="(movie, index) in movies">
        <div class="carrousel__title">
          {{movie.title}} - TOP #{{index+1}}
          <div class="carrousel__button" @click="detailMovie(movie.id)">Detalhes</div>
        </div>

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
  methods: {
    detailMovie(id) {
      this.$router.push(`/details/movie/` + id);
    }
  },
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
  width: 97vw;
  height: 50vw;
  text-align: center;
  overflow: hidden;
  margin-bottom: 1em;
}

.carrousel__item {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scroll-snap-stop: always;

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: white;
    margin-top: 1em;
    padding-top: 1em;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  & > .carrousel__card {
    scroll-snap-align: start;
    flex-shrink: 0;
    width: 97vw;
    height: 50vh;
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
    //   animation: slideshow 25s linear infinite;

    //   @keyframes slideshow {
    //     0% {
    //       left: 0;
    //     }
    //     100% {
    //       left: -200%;
    //     }
    //   }
  }

  & .carrousel__title {
    z-index: 333;
    font-size: 20px;
    color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    bottom: 0;
    position: absolute;
    left: 0;
    width: 100%;
    text-align: start;
    padding-left: 2em;
    width: 97.9%;
    height: 4em;
    & .carrousel__button {
      margin-top: 10px;
      color: #fff;
      margin-right: 4em;
      padding: 5px;
      cursor: pointer;
      border-radius: 5px;
      border: 1px solid rgba(255, 255, 255, 0.13);
    }

    background: rgb(2, 0, 36);
    background: linear-gradient(
      169deg,
      rgba(2, 0, 36, 0.644) 13%,
      rgba(103, 70, 70, 0.5) 100%
    );
  }
}

.carrousel__image {
  object-fit: cover;
  position: absolute;
  top: 0;
  cursor: pointer;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>