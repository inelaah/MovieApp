module app.routes
{
    export class Config
    {
        static $inject = ["$locationProvider", "$stateProvider", "$urlRouterProvider"];
        constructor(private $locationProvider: ng.ILocationProvider, 
            private $stateProvider: ng.ui.IStateProvider, 
            private $urlRouterProvider: ng.ui.IUrlRouterProvider   
            )
        {
            this.init();
        }
        private init(): void
        {           
            this.$urlRouterProvider.otherwise('/movies');
            
            this.$stateProvider.state('root', {
                templateUrl: 'layout/layout.html',
                controller: 'Navigation',
                controllerAs: 'ctrl'  
            });          
            
            this.$stateProvider.state("root.movies", <ng.ui.IState>
            {
                url: "/movies",
                resolve: {
                    moviesPage: (dataAccessService: app.common.IDataAccessService) => {
                        return dataAccessService.getTopRatedMovies().get().$promise;
                    }
                },
                templateUrl: 'movies/movies.html',
                controller: 'Movies',
                controllerAs: 'ctrl'  
            });
            
            this.$stateProvider.state("root.movies-search", <ng.ui.IState>
            {
                url: "/movies/search/:query",
                resolve: {
                    moviesPage: (dataAccessService: app.common.IDataAccessService, $stateParams: ng.ui.IStateParamsService) => {
                        return dataAccessService.searchMovies($stateParams["query"]).get().$promise;
                    }
                },
                templateUrl: 'movies/movies.html',
                controller: 'Movies',
                controllerAs: 'ctrl'             
            });

            this.$stateProvider.state("movie-details", <ng.ui.IState>
            {
                url: "/movies/:id",
                resolve: {
                    movie: (dataAccessService: app.common.IDataAccessService, $stateParams: ng.ui.IStateParamsService) => {
                        return dataAccessService.getMovieDetails($stateParams["id"]).get().$promise;
                    }
                },
                templateUrl: 'movies/movie-details.html',
                controller: 'MovieDetails',
                controllerAs: 'ctrl'            
            });

            this.$stateProvider.state("root.tv-shows", <ng.ui.IState>
            {
                url: "/tv-shows",
                resolve: {
                    tvShowsPage: (dataAccessService: app.common.IDataAccessService, $stateParams: ng.ui.IStateParamsService) => {
                        return dataAccessService.getTopRatedTvShows().get().$promise;
                    }
                },
                templateUrl: 'tv-shows/tv-shows.html',
                controller: 'TvShows',
                controllerAs: 'ctrl'     
            });

            this.$stateProvider.state("root.tv-shows-search", <ng.ui.IState>
            {
                url: "/tv-shows/search/:query",
                resolve: {
                    tvShowsPage: (dataAccessService: app.common.IDataAccessService, $stateParams: ng.ui.IStateParamsService) => {
                        return dataAccessService.searchTvShows($stateParams["query"]).get().$promise;
                    }
                },
                templateUrl: 'tv-shows/tv-shows.html',
                controller: 'TvShows',
                controllerAs: 'ctrl'            
            });

            this.$stateProvider.state("tv-show-details", <ng.ui.IState>
            {
                url: "/tv-shows/:id",
                resolve: {
                    tvShow: (dataAccessService: app.common.IDataAccessService, $stateParams: ng.ui.IStateParamsService) => {
                        return dataAccessService.getTvShowDetails($stateParams["id"]).get().$promise;
                    }
                },
                templateUrl: 'tv-shows/tv-show-details.html',
                controller: 'TvShowDetails',
                controllerAs: 'ctrl'            
            });

        }
    }

    angular.module("app")
    .config(
        ["$locationProvider", "$stateProvider", "$urlRouterProvider",
            ($locationProvider: ng.ILocationProvider, $stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) =>
            {
                return new app.routes.Config($locationProvider, $stateProvider, $urlRouterProvider);
            }
        ]);

}

