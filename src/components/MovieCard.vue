<template>
  <div class="todo-item" v-bind:class="{'movie-card--favorite':favorite}">
    <p>
      {{movie.title}}
      <button @click="addFavorite(movie.id)" class="movie-card__button--favorite">ADD</button> |
      <button @click="detailMovie(movie.id)" class="movie-card__button--detail">DETAIL</button> |
      <button @click="$emit('del-movie', movie.id)" class="del">x</button>
      |
      id: {{movie.id}}
    </p>
  </div>
</template>

<script>
export default {
  name: "MovieCard",
  data() {
    return {
      favorite: false
    };
  },
  props: ["movie"],
  methods: {
    addFavorite(id) {
      this.favorite = !this.favorite;
      this.$emit("add-favorite", id);
    },
    detailMovie(id) {
      this.$emit("detail-movie", id);
    }
  },
  watch: {
    favorite(isFavorite) {
      this.movie["favorite"] = isFavorite;
    }
  }
};
</script>

<style lang="scss" scoped>
.movie-card {
  &__image {
  }
  &__button {
    &--favorite {
      background-color: purple;
    }
    &--unfavorite {
    }
    &--detail {
      background-color: royalblue;
    }
  }
  &--favorite {
    background-color: yellow;
  }
}
</style>