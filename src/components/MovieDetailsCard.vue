<template>
  <div class="todo-item" v-bind:class="{'movie-card--favorite':favorite}">
    <p>
      {{movie.title}}
      <button @click="$emit('detail-movie', movie.id)" class="del">x</button>
      <button @click="addFavorite(movie.id)" class="movie-card__button--favorite">ADD</button>
      |
      id: {{movie.id}}
    </p>
  </div>
</template>

<script>
export default {
  name: "MovieDetailsCard",
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