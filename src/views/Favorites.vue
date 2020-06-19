<template>
  <div class="favorites">
    <div class="favorites__movies">
      <span class="favorites__header">SEUS FILMES</span>
      <MoviesList
        v-bind:movies="updatedMovies"
        v-bind:src="baseIMG"
        v-bind:isFavorite="true"
        v-bind:poster="posterPath"
        v-on:detail-movie="detailMovie"
        v-on:del-movie="deleteMovie"
      />
    </div>
    <div class="favorites__series">
      <span class="favorites__header">SUAS SÉRIES</span>
      <MoviesList
        v-bind:movies="updatedSeries"
        v-bind:src="baseIMG"
        v-bind:isFavorite="true"
        v-bind:poster="posterPath"
        v-on:detail-movie="detailSerie"
        v-on:del-movie="deleteSerie"
      />
    </div>
  </div>
</template>

<script>
import MoviesList from "@/components/MoviesList.vue";
import axios from "axios";
export default {
  name: "Movies",
  data() {
    return {
      favoriteMovies: [],
      favoriteSeries: [],
      movies: [],
      genres: [],
      genreNames: [],
      updatedMovies: [],
      updatedSeries: [],
      counter: 1,
      type: "movie",
      filter: "asc",
      baseURL: "https://api.themoviedb.org/3",
      baseIMG: "https://image.tmdb.org/t/p/original",
      posterPath: "http://image.tmdb.org/t/p/w500",
      moviedbKEY: "533bf9a3f2e9acf633932e225a72339e",
      fullUrl: this.baseURL
    };
  },
  components: {
    MoviesList
  },
  mounted() {
    this.getFavorites();
    this.getGenres();
  },
  methods: {
    filterMoviesByDate(filter) {
      this.filter = filter;
    },
    getFavorites() {
      this.favoriteMovies = [
        ...new Set(localStorage.getItem("favoriteMovies").split(","))
      ];
      this.favoriteSeries = [
        ...new Set(localStorage.getItem("favoriteSeries").split(","))
      ];

      this.favoriteMovies.forEach(movie => {
        this.getMoviesById(Number(movie));
      });
      this.favoriteSeries.forEach(movie => {
        this.getSeriesById(Number(movie));
      });
    },
    searchBy(type) {
      this.type = type;
    },

    getGenres() {
      axios
        .get(
          `${this.baseURL}/genre/${this.type}/list?api_key=${this.moviedbKEY}&language=pt-BR`
        )
        .then(response => {
          this.genres = response.data.genres;
          this.updatedMovies.forEach(movie => {
            if (movie["genre_ids"] !== undefined)
              this.genreNames = movie.genre_ids.map(
                id => this.genres.find(genre => genre.id === id).name
              );
            movie["genre_ids"] = this.genreNames;
          });
        });
    },

    detailMovie(id) {
      this.$router.push(`/details/movie/` + id);
    },
    detailSerie(id) {
      this.$router.push(`/details/tv/` + id);
    },
    deleteMovie(id) {
      this.updatedMovies = this.updatedMovies.filter(movie => movie.id !== id);
      const updatedMoviesId = this.updatedMovies.map(
        movie => (movie = movie.id)
      );
      localStorage.setItem("favoriteMovies", updatedMoviesId);
    },
    deleteSerie(id) {
      this.updatedSeries = this.updatedSeries.filter(serie => serie.id !== id);
      const updatedSeriesId = this.updatedSeries.map(
        serie => (serie = serie.id)
      );
      localStorage.setItem("favoriteSeries", updatedSeriesId);
    },
    getMoviesById(id) {
      if (id !== 0)
        axios
          .get(
            `${this.baseURL}/movie/${id}?api_key=${this.moviedbKEY}&language=pt-BR&sort_by=release_date.${this.filter}`
          )
          .then(response => this.updatedMovies.push(response.data));
    },
    getSeriesById(id) {
      if (id !== 0)
        axios
          .get(
            `${this.baseURL}/tv/${id}?api_key=${this.moviedbKEY}&language=pt-BR`
          )
          .then(response => this.updatedSeries.push(response.data));
    }
  }
};
</script>

<style lang="scss" scoped>
.favorites {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
}
</style>