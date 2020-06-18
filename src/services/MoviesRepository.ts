
import axios from 'axios';

/* REPOSITORY FACTORY ~ PATTERN */

const baseURL = "https://api.themoviedb.org/3";

/* Could be saved inside 
    ~env variables 
for safety purposes */

const moviedbKEY = "533bf9a3f2e9acf633932e225a72339e";

const MoviesRepository = axios.create({
    baseURL
});

const movie = "/movie";
const discover = "/discover";
const search = "/search";

export default {
    getMovie(id: number) {
        return MoviesRepository.get(
            `${movie}/${id}?api_key=${
            moviedbKEY
            }&language=en`
        );
    },
    getPopularMovies() {
        return MoviesRepository.get(
            `${discover}${movie}?api_key=${
            moviedbKEY
            }&sort_by=popularity.desc`
        );
    },
    getMovieByPage(page: number) {
        return MoviesRepository.get(
            `${discover}${movie}?api_key=${
            moviedbKEY
            }&page=${page}&sort_by=popularity.desc`
        );
    },
    searchMovies(query: string) {
        return MoviesRepository.get(
            `${search}${movie}?api_key=${
            moviedbKEY
            }&query=${query}`
        );
    }
};

