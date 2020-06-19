<template>
  <div>
    <div class="movie_card" id="bright">
      <div class="info_section">
        <div class="movie_header">
          <img class="locandina" :src="poster+movie.poster_path" />
          <h1>{{movie.title ? movie.title : movie.original_name}}</h1>
          <span class="minutes">{{movie.release_date | getDate}}</span>
          <p class="type">{{movie.genre_ids !== undefined ? movie.genre_ids.join(', ') : ''}}</p>
          <p
            class="type"
          >{{movie.genres !== undefined ? movie.genres.map(genre => genre.name).join(', ') : ''}}</p>
        </div>
        <div class="movie_desc">
          <p class="text">{{movie.overview}}</p>
        </div>
        <div class="movie_social">
          <ul>
            <li>
              <span class="minutes" @click="favoriteMovie(movie.id)">{{ actionText}}</span>
            </li>
            <li>
              <span class="minutes" @click="detailMovie(movie.id)">Detalhes</span>
            </li>
          </ul>
        </div>
      </div>
      <div
        class="blur_back bright_back"
        v-bind:style="{
        background: 'url('+src+movie.backdrop_path+')'
        }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieCard",
  data() {
    return {
      actionText: "Favoritar"
    };
  },
  props: ["movie", "src", "poster", "isFavorite"],
  methods: {
    favoriteMovie(id) {
      if (this.isFavorite === true) this.$emit("del-movie", id);
      else if (this.isFavorite === false) {
        this.$emit("add-favorite", id);
        this.actionText = "Desfavoritar";
      }
    },
    detailMovie(id) {
      this.$emit("detail-movie", id);
    }
  },
  mounted() {
    this.isFavorite === false
      ? (this.actionText = "Favoritar")
      : (this.actionText = "Desfavoritar");
  },
  filters: {
    getDate(date) {
      const t = new Date(date);
      return t.getFullYear();
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

.movie_card {
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

  .info_section {
    position: relative;
    width: 100%;
    height: 100%;
    background-blend-mode: multiply;
    z-index: 2;
    border-radius: 10px;
    .movie_header {
      position: relative;
      padding: 10px 25px;
      height: 40%;
      h1 {
        color: #fff;
        font-weight: 400;
        overflow: hidden;
        word-wrap: break-word;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* number of lines to show */
        -webkit-box-orient: vertical;
      }

      .minutes {
        display: inline-block;
        margin-top: 10px;
        color: #fff;
        padding: 5px;
        border-radius: 5px;
        border: 1px solid rgba(255, 255, 255, 0.13);
      }
      .type {
        display: inline-block;
        color: #cee4fd;
        margin-left: 10px;
      }
      .locandina {
        position: relative;
        float: left;
        margin-right: 20px;
        height: 120px;
        box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.5);
      }
    }
    .movie_desc {
      padding: 25px;
      height: 50%;
      .text {
        color: #cfd6e1;
        overflow: hidden;
        word-wrap: break-word;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3; /* number of lines to show */
        -webkit-box-orient: vertical;
      }
    }
    .movie_social {
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
  }
  .blur_back {
    position: absolute;
    top: 0;
    z-index: 1;
    height: 100%;
    right: 0;
    background-size: cover;
    border-radius: 11px;
  }
}

@media screen and (min-width: 768px) {
  .movie_header {
    width: 60%;
  }

  .movie_desc {
    width: 50%;
  }

  .info_section {
    background: linear-gradient(to right, #0d0d0c 50%, transparent 100%);
  }

  .blur_back {
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

  .blur_back {
    width: 100%;
    background-position: 50% 50% !important;
  }

  .movie_header {
    width: 100%;
    margin-top: 85px;
  }

  .movie_desc {
    width: 100%;
  }

  .info_section {
    background: linear-gradient(to top, rgb(20, 20, 19) 50%, transparent 100%);
    display: inline-grid;
  }
}
</style>