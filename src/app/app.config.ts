module app.config {

     export interface IConstants {
            BASE: string,
            BASE_API: string,
            API_KEY: string,
            IMAGE_BASE: string,
            VIDEO_BASE: string,
            VIDEO_TYPE: string,
            VIDEO_SITE: string
     }
     export class Constants implements Constants {
            constructor(public BASE: string, public BASE_API: string, public API_KEY: string, public IMAGE_BASE: string, 
                public VIDEO_BASE: string, public VIDEO_TYPE: string, public VIDEO_SITE: string) { }
     }

     angular.module("app")
    .value("constants",
        {   
            BASE: 'https://api.themoviedb.org', 
            API_BASE: 'https://api.themoviedb.org/3', 
            API_KEY: '3138ecf71d5ad1e8d8dd459e6c3e0065',
            IMAGE_BASE: 'http://image.tmdb.org/t/p/w300/',
            VIDEO_BASE: 'https://www.youtube.com/embed/',
            VIDEO_TYPE: 'trailer',
            VIDEO_SITE: 'youtube'
        });
}