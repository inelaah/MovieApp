namespace app.domain {
        export interface IMovie {
        id: number;
        title: string;
        absoluteImageUrl: string;
        overview: string;
        trailerUrl: string;
        videos: Array<app.domain.Video>;
    }

    export class Movie implements IMovie {
        absoluteImageUrl: string;
        trailerUrl: string;

        constructor(private imageBaseUrl: string,
                    private relativeImageUrl: string,
                    public id: number,
                    public title: string,
                    public overview: string,
                    public videos: Array<app.domain.Video>) {
                        this.absoluteImageUrl = this.relativeImageUrl ? `${this.imageBaseUrl}${this.relativeImageUrl}` : null;
        }
    }
}

