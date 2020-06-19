<template>
  <div class="movie-card" v-bind:class="{'movie-card--favorite':favorite}">
    <div class="movie-card__info">
      <p class="movie-card__title">{{movie.title ? movie.title : movie.original_name}}</p>
      <span class="movie-card__overview">{{movie.overview}}</span>
      <span class="movie-card__span star">Nota: {{movie.vote_average}}</span>
      <span class="movie-card__span">Tempo: {{movie.runtime }} minutos</span>

      <button @click="addFavorite(movie.id)" class="card-footer movie-card__button--favorite">ADD</button>
    </div>
    <img class="movie-card__image" :src="movie.backdrop_path" />
  </div>
</template>

<script>
export default {
  name: "MovieDetailsCard",
  data() {
    return {
      defaultImage:
        "https://previews.123rf.com/images/guru3d/guru3d1505/guru3d150503778/39830496-3d-red-text-default-on-a-white-background-the-film-strip.jpg"
    };
  },
  props: ["movie", "src"],
  methods: {
    addFavorite(id) {
      this.favorite = !this.favorite;
      this.$emit("add-favorite", id);
    }
  },
  watch: {
    movie() {
      if (this.movie.backdrop_path === null)
        this.movie["backdrop_path"] = this.defaultImage;
      else if (this.movie.backdrop_path === undefined)
        this.movie["backdrop_path"] = this.defaultImage;
      else if (this.movie.backdrop_path !== null) {
        this.movie["backdrop_path"] = this.src + this.movie.backdrop_path;
      }
      if (this.movie.overview.length === 0)
        this.movie["overview"] = "Não há descrição disponível";
    }
  }
};
</script>

<style lang="scss" scoped>
.movie-card {
  position: relative;
  display: block;
  width: 800px;
  height: 350px;
  margin: 35px auto;
  overflow: hidden;
  border-radius: 10px;
  transition: all 0.4s;
  &:hover {
    transform: scale(1.02);
    transition: all 0.4s;
  }
  &__span {
    &.star {
      &::after {
        content: "★";
        color: red;
      }
    }
  }

  &__image {
    &--poster {
      position: relative;
      float: left;
      margin-right: 20px;
      height: 120px;
      box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.5);
    }
    position: absolute;
    top: 0;
    z-index: 1;
    height: 100%;
    right: 0;
    background-size: cover;
    border-radius: 11px;
  }
  &__title {
    position: relative;
    padding: 10px 25px;
    height: 40%;
  }
  &__date {
    display: inline-block;
    margin-top: 10px;
    color: #fff;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.13);
  }

  &__type {
    display: inline-block;
    color: #cee4fd;
    margin-left: 10px;
  }

  &__overview {
    position: relative;
    width: 100%;
    height: 100%;
    background-blend-mode: multiply;
    z-index: 2;
    border-radius: 10px;
  }
  &__options {
    height: 10%;
    padding-left: 15px;
    margin-top: -7em;
    padding-bottom: 20px;
    ul {
      list-style: none;
      padding: 0;
      display: flex;
      justify-content: flex-start;
      li {
        color: rgba(255, 255, 255, 0.4);
        transition: color 0.3s;
        transition-delay: 0.15s;
        margin: 0 10px;
        .minutes {
          display: inline-block;
          margin-top: 10px;
          color: #fff;
          padding: 5px;
          border-radius: 5px;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.13);
          &:hover {
            transition: color 0.3s;
            background-color: rgba(255, 255, 255, 0.13);
            color: rgba(255, 255, 255, 0.8);
          }
        }
      }
    }
  }
  &__button {
    &--favorite {
      background-color: orangered;
    }
    &--unfavorite {
    }
  }
  &--favorite {
    background-color: yellow;
  }

  @media screen and (min-width: 768px) {
    .movie-card__title {
      width: 60%;
    }

    .movie-card__overview {
      width: 50%;
    }

    .movie-card__info {
      background: linear-gradient(to right, #0d0d0c 50%, transparent 100%);
    }

    .movie-card__image {
      width: 80%;
      background-position: -100% 10% !important;
    }
  }

  @media screen and (max-width: 768px) {
    .movie_card {
      width: 95%;
      margin: 70px auto;
      min-height: 350px;
      height: auto;
    }

    .movie-card__image {
      width: 100%;
      background-position: 50% 50% !important;
    }

    .movie-card__title {
      width: 100%;
      margin-top: 85px;
    }

    .movie-card__overview {
      width: 100%;
    }

    .movie-card__info {
      background: linear-gradient(
        to top,
        rgb(20, 20, 19) 50%,
        transparent 100%
      );
      display: inline-grid;
    }
  }
}
</style>