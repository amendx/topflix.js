<template>
  <div class="movie-card" v-bind:class="{'movie-card--favorite':favorite}">
    <p class="movie-card__title">{{movie.title ? movie.title : movie.original_name}}</p>
    <span class="movie-card__overview">{{movie.overview}}</span>
    <img class="movie-card__image" :src="movie.backdrop_path" />
    <span class="movie-card__span star">Nota: {{movie.vote_average}}</span>
    <span class="movie-card__span">Tempo: {{movie.runtime }} minutos</span>
    <button @click="addFavorite(movie.id)" class="movie-card__button--favorite">ADD</button>
  </div>
</template>

<script>
export default {
  name: "MovieDetailsCard",
  data() {
    return {
      favorite: false,
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
    favorite(isFavorite) {
      this.movie["favorite"] = isFavorite;
    },
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
  display: flex;
  flex-direction: column;
  align-items: center;
  outline: 1px solid green;
  &__span {
    &.star {
      &::after {
        content: "★";
        color: red;
      }
    }
  }

  &__image {
    width: 600px;
    height: 300px;
  }
  &__title {
    font-size: 2em;
  }

  &__overview {
    font-size: 1em;
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
}
</style>