namespace app.domain {

    export interface ITvShowsPage {
        page: number;
        totalPages: number;
        tvShows: ITvShow[];
    }

    export class TvShowsPage implements ITvShowsPage {

        constructor( public page: number, public totalPages: number, public tvShows: ITvShow[] ) { }
        
    }

}

