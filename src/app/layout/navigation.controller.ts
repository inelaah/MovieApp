namespace app {
    interface INavigation {
        query: string;
        search(): void;
    }

    class Navigation implements INavigation {
        query: string;

        static $inject = ["$state"];
        constructor( public $state: any ) { }

        search(): void {
            if (this.query.length > 3)
                if(this.$state.$current.name.indexOf('movies') != -1)
                    this.$state.go('root.movies-search', { query: this.query });
                else if(this.$state.$current.name.indexOf('tv-shows') != -1)
                    this.$state.go('root.tv-shows-search', { query: this.query });
        }
    }

    angular
    .module("app")
    .controller("Navigation",
        Navigation);
}

    