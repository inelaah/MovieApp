namespace app {
    interface ITvShowDetails {
        tvShow: app.domain.ITvShow;
        GoBack(): void;
    }

    class TvShowDetails implements ITvShowDetails {
        tvShow: app.domain.ITvShow;

        static $inject = ["$previousState", "constants", "tvShow"];
        constructor( private $previousState: any, private constants: app.config.IConstants, tvShow: app.domain.ITvShow ) {
           this.tvShow = tvShow;
           this.SetTrailerUrl();
        }

        private SetTrailerUrl() {
            this.tvShow.videos.forEach(
                (video) => {
                    if(video.type.toLowerCase() == this.constants.VIDEO_TYPE && video.site.toLowerCase() == this.constants.VIDEO_SITE)
                    {
                        this.tvShow.trailerUrl = `${this.constants.VIDEO_BASE}${video.key}`;
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
    .controller("TvShowDetails",
        TvShowDetails);
}

    