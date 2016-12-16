module app.common {
    export interface IDataAccessService {
         getTopRatedMovies(): ng.resource.IResourceClass<IMoviesPageResource>;
         searchMovies(query: string, page?: number): ng.resource.IResourceClass<IMoviesPageResource>;
         getMovieDetails(id: number): ng.resource.IResourceClass<IMovieResource>;
         getTopRatedTvShows(): ng.resource.IResourceClass<ITvShowsPageResource>;
         searchTvShows(query: string, page?: number): ng.resource.IResourceClass<ITvShowsPageResource>;
         getTvShowDetails(id: number): ng.resource.IResourceClass<ITvShowResource>;
    }

    interface IMoviesPageResource extends ng.resource.IResource<app.domain.IMoviesPage> { }

    interface IMovieResource extends ng.resource.IResource<app.domain.IMovie> { }
        
    interface ITvShowsPageResource extends ng.resource.IResource<app.domain.ITvShowsPage> { }

    interface ITvShowResource extends ng.resource.IResource<app.domain.ITvShow> { }

    export class DataAccessService implements IDataAccessService {

        static $inject = ["$resource", "mapperService", "constants"];
        constructor(private $resource: ng.resource.IResourceService, private mapperService: app.common.IMapperService, private constants: any) { }

        getTopRatedMovies(): ng.resource.IResourceClass<IMoviesPageResource> {
            var self = this;
            return this.$resource(`${this.constants.API_BASE}/movie/top_rated?api_key=${this.constants.API_KEY}`, {  },
            {
              get: {
                method: 'GET',
                transformResponse: function(data: any ) {    
                  return self.mapperService.mapMoviesPage(data);
                }
              }
            });
        }

        searchMovies(query: string, page = 1): ng.resource.IResourceClass<IMoviesPageResource> {
            var self = this;
            return this.$resource(`${this.constants.API_BASE}/search/movie?api_key=${this.constants.API_KEY}&query=${query}&page=${page}`, {  },
            {
              get: {
                method: 'GET',
                transformResponse: function(data: any) {               
                  return self.mapperService.mapMoviesPage(data);
                }
              }
            });
        }

        getMovieDetails(id: number): ng.resource.IResourceClass<IMovieResource> {
            var self = this;
            return this.$resource(`${this.constants.API_BASE}/movie/${id}?api_key=${this.constants.API_KEY}&append_to_response=videos`, {  },
            {
              get: {
                method: 'GET',
                transformResponse: function(data: any) {               
                  return self.mapperService.mapMovie(data);
                }
              }
            });
        }

        getTopRatedTvShows(): ng.resource.IResourceClass<ITvShowsPageResource> {
            var self = this;
            return this.$resource(`${this.constants.API_BASE}/tv/top_rated?api_key=${this.constants.API_KEY}`, {  },
            {
              get: {
                method: 'GET',
                transformResponse: function(data: any) {               
                  return self.mapperService.mapTvShowsPage(data);
                }
              }
            });
        }

        searchTvShows(query: string, page = 1): ng.resource.IResourceClass<ITvShowsPageResource> {
            var self = this;
            return this.$resource(`${this.constants.API_BASE}/search/tv?api_key=${this.constants.API_KEY}&query=${query}&page=${page}`, {  },
            {
              get: {
                method: 'GET',
                transformResponse: function(data: any) {               
                  return self.mapperService.mapTvShowsPage(data);
                }
              }
            });
        }

        getTvShowDetails(id: number): ng.resource.IResourceClass<ITvShowResource> {
            var self = this;
            return this.$resource(`${this.constants.API_BASE}/tv/${id}?api_key=${this.constants.API_KEY}&append_to_response=videos`, {  },
            {
              get: {
                method: 'GET',
                transformResponse: function(data: any) {               
                  return self.mapperService.mapTvShow(data);
                }
              }
            });
        }
    }

    angular
    .module("common.services")
    .service("dataAccessService", DataAccessService);
}