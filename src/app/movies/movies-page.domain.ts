namespace app.domain {

    export interface IMoviesPage {
        page: number;
        totalPages: number;
        movies: IMovie[];
    }

    export class MoviesPage implements IMoviesPage {

        constructor( public page: number, public totalPages: number, public movies: IMovie[] ) { }
    }

}

