module app.common {

    var mockResource = angular
        .module("movieResourceMock",
            ["ngMockE2E"]);

    mockResource.run(mockRun);
    
    mockRun.$inject = ["$httpBackend"];
    function mockRun($httpBackend: ng.IHttpBackendService) : void {
        var movies: app.domain.IMovie[] = [];
        var movie: app.domain.IMovie;

        movie = new app.domain.Movie("https://api.themoviedb.org/3", "/yE5d3BUhE8hCnkMUJOo1QDoOGNz.jpg", 13, "Forrest Gump", "A man with a low IQ has accomplished great things in his life and been present during significant historic events - in each case, far exceeding what anyone imagined he could do. Yet, despite all the things he has attained, his one true love eludes him. 'Forrest Gump' is the story of a man who rose above his challenges, and who proved that determination, courage, and love are more important than ability.", [] );
        movies.push(movie);
        
        movie = new app.domain.Movie("https://api.themoviedb.org/3", "/gzlJkVfWV5VEG5xK25cvFGJgkDz.jpg", 128, "Princess Mononoke", "Ashitaka, a prince of the disappearing Ainu tribe, is cursed by a demonized boar god and must journey to the west to find a cure. Along the way, he encounters San, a young human woman fighting to protect the forest, and Lady Eboshi, who is trying to destroy it. Ashitaka must find a way to bring balance to this conflict.", [] );
        movies.push(movie);
        
        movie = new app.domain.Movie("https://api.themoviedb.org/3", "/bwVhmPpydv8P7mWfrmL3XVw0MV5.jpg", 12477, "Grave of the Fireflies", "In the latter part of World War II, a boy and his sister, orphaned when their mother is killed in the firebombing of Tokyo, are left to survive on their own in what remains of civilian life in Japan. The plot follows this boy and his sister as they do their best to survive in the Japanese countryside, battling hunger, prejudice, and pride in their own quiet, personal battle.", [] );
        movies.push(movie);
        
        movie = new app.domain.Movie("https://api.themoviedb.org/3", "/6u1fYtxG5eqjhtCPDx04pJphQRW.jpg", 1891, "The Empire Strikes Back", "The epic saga continues as Luke Skywalker, in hopes of defeating the evil Galactic Empire, learns the ways of the Jedi from aging master Yoda. But Darth Vader is more determined than ever to capture Luke. Meanwhile, rebel leader Princess Leia, cocky Han Solo, Chewbacca, and droids C-3PO and R2-D2 are thrown into various stages of capture, betrayal and despair.", [] );
        movies.push(movie);
        
        movie = new app.domain.Movie("https://api.themoviedb.org/3", "/3W0v956XxSG5xgm7LB6qu8ExYJ2.jpg", 389, "12 Angry Men", "The defense and the prosecution have rested and the jury is filing into the jury room to decide if a young Spanish-American is guilty or innocent of murdering his father. What begins as an open and shut case soon becomes a mini-drama of each of the jurors' prejudices and preconceptions about the trial, the accused, and each other.", [] );
        movies.push(movie);

        var movieUrl = "/movies";

        $httpBackend.whenGET(movieUrl).respond(movies);

        var editingRegex = new RegExp(movieUrl + "/[0-9][0-9]*", '');
        $httpBackend.whenGET(editingRegex).respond(function(method, url, data) {
            var movie = { "id": 0 };
            var parameters = url.split('/');
            var length = parameters.length;
            var id = +parameters[length - 1];

            if (id > 0) {
                for (var i = 0; i < movies.length; i++) {
                    if (movies[i].id == id) {
                        movie = movies[i];
                        break;
                    }
                }
            }
            return [200, movie, {}];
        });

        $httpBackend.whenGET(movieUrl).respond(function(method, url, data) {
            return [200, movies, {}];
        });
                
        $httpBackend.whenGET(/movies/).passThrough();
    }
}
