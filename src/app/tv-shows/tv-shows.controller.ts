namespace app {
    interface ITvShows {
        tvShows: app.domain.ITvShow[];
        chunkedTvShows: Array<Array<app.domain.ITvShow>>;
        goToDetails(id: number): void;
    }

    class TvShows implements ITvShows {
        tvShows: app.domain.ITvShow[];
        chunkedTvShows: Array<Array<app.domain.ITvShow>>;

        static $inject = ["$state", "dataManipulationService", "tvShowsPage"];
        constructor( private $state: any, private dataManipulationService: app.common.IDataManipulationService, tvShowsPage: app.domain.ITvShowsPage ) {
           this.tvShows = $state.$current.name == "tv-shows" ? tvShowsPage.tvShows.slice(0, 10) : tvShowsPage.tvShows;
           this.chunkedTvShows = dataManipulationService.chunkArray<app.domain.ITvShow>(this.tvShows, 2);
        }

        goToDetails(id: number) {
            this.$state.go('tv-show-details', { id: id });
        }
    }

    angular
    .module("app")
    .controller("TvShows",
        TvShows);
}

    