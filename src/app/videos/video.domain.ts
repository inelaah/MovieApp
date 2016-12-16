namespace app.domain {

    export interface IVideo {
        id: number;
        key: string;
        name: string;
        site: string;
        type: string;
        absoluteVideoUrl: string;
    }

    export class Video implements IVideo {
        absoluteVideoUrl: string;

        constructor(private videoBaseUrl: string,
                    public id: number,
                    public key: string,
                    public name: string,
                    public site: string,
                    public type: string) {
                        this.absoluteVideoUrl = `${this.videoBaseUrl}${this.key}`;
        }
    }
}