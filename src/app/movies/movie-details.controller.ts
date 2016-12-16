namespace app {
    interface IMovieDetails {
        movie: app.domain.IMovie;
        GoBack(): void;
    }

    class MovieDetails implements IMovieDetails {
        movie: app.domain.IMovie;

        static $inject = ["$previousState", "constants", "movie"];
        constructor( private $previousState: any, private constants: app.config.IConstants, movie: app.domain.IMovie ) {
           this.movie = movie;
           this.SetTrailerUrl();
        }

        private SetTrailerUrl() {
            this.movie.videos.forEach(
                (video) => {
                    if(video.type.toLowerCase() == this.constants.VIDEO_TYPE && video.site.toLowerCase() == this.constants.VIDEO_SITE)
                    {
                        this.movie.trailerUrl = `${this.constants.VIDEO_BASE}${video.key}`;
                        return;
                    }
                }
            )
        }

        public GoBack(): void {
            this.$previousState.go();
        }
    }

    angular
    .module("app")
    .controller("MovieDetails",
        MovieDetails);
}

    