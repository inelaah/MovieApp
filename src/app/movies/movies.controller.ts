namespace app {
    interface IMovies {
        movies: app.domain.IMovie[];
        chunkedMovies: Array<Array<app.domain.IMovie>>;
        goToDetails(id: number): void;
    }

    class Movies implements IMovies {
        movies: app.domain.IMovie[];
        chunkedMovies: Array<Array<app.domain.IMovie>>;

        static $inject = ["$state", "dataManipulationService", "moviesPage"];
        constructor( private $state: any, private dataManipulationService: app.common.IDataManipulationService, moviesPage: app.domain.IMoviesPage ) {
           this.movies = $state.$current.name == "movies" ? moviesPage.movies.slice(0, 10) : moviesPage.movies;
           this.chunkedMovies = dataManipulationService.chunkArray<app.domain.IMovie>(this.movies, 2);
        }

        goToDetails(id: number) {
            this.$state.go('movie-details', { id: id });
        }
    }

    angular
    .module("app")
    .controller("Movies",
        Movies);
}

    