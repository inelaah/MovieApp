namespace app.domain {
        export interface ITvShow {
        id: number;
        name: string;
        absoluteImageUrl: string;
        overview: string;
        trailerUrl: string;
        videos: Array<app.domain.Video>;
    }

    export class TvShow implements ITvShow {
        absoluteImageUrl: string;
        trailerUrl: string;

        constructor(private imageBaseUrl: string,
                    private relativeImageUrl: string,
                    public id: number,
                    public name: string,       
                    public overview: string,
                    public videos: Array<app.domain.Video>) {
                        this.absoluteImageUrl = this.relativeImageUrl ? `${this.imageBaseUrl}${this.relativeImageUrl}` : null;
        }
    }
}

