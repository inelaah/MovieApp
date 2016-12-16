module app.common {
    export interface IMapperService {
         mapMoviesPage(jsonData: string): app.domain.MoviesPage;
         mapTvShowsPage(jsonData: string): app.domain.TvShowsPage;
         mapMovie(jsonData: string): app.domain.Movie;
         mapTvShow(jsonData: string): app.domain.TvShow;
         mapVideos(input: any): Array<app.domain.Video>;
    }

    export class MapperService implements IMapperService {

        static $inject = ["constants"];
        constructor( private constants: app.config.IConstants ) {}

        mapMoviesPage(jsonData: string): app.domain.MoviesPage {
            let moviesPage = JSON.parse(jsonData);            
            let movies = new Array<app.domain.Movie>();
            for(var i in moviesPage.results)
            {
                let m = moviesPage.results[i];
                movies.push(new app.domain.Movie(this.constants.IMAGE_BASE, m.poster_path, m.id, m.title, m.overview, null));
            }
            return new app.domain.MoviesPage(moviesPage.page, moviesPage.total_pages, movies);
        }

        mapTvShowsPage(jsonData: string): app.domain.TvShowsPage {
            let tvShowsPage = JSON.parse(jsonData);            
            let tvShows = new Array<app.domain.TvShow>();
            for(var i in tvShowsPage.results)
            {
                let tvs = tvShowsPage.results[i];
                tvShows.push(new app.domain.TvShow(this.constants.IMAGE_BASE, tvs.poster_path, tvs.id, tvs.name, tvs.overview, null));
            }
            return new app.domain.TvShowsPage(tvShowsPage.page, tvShowsPage.total_pages, tvShows);
        }

        mapMovie(jsonData: string): app.domain.Movie {
            let m =  JSON.parse(jsonData);
            return new app.domain.Movie(this.constants.IMAGE_BASE, m.poster_path, m.id, m.title, m.overview, this.mapVideos(m.videos.results));
        }

        mapTvShow(jsonData: string): app.domain.TvShow {
            let t =  JSON.parse(jsonData);
            return new app.domain.TvShow(this.constants.IMAGE_BASE, t.poster_path, t.id, t.title, t.overview, this.mapVideos(t.videos.results));
        }

        mapVideos(input: any): Array<app.domain.Video> {
            let videos = new Array<app.domain.Video>();
            for(var i in input)
            {
                let video = new app.domain.Video(this.constants.VIDEO_BASE, input[i].id, input[i].key, input[i].name, input[i].site, input[i].type);
                videos.push(video);
            }
            return videos;
        }
    }

    angular
    .module("common.services")
    .service("mapperService", MapperService);
}