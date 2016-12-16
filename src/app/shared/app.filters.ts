module app.filters {

    export class TrustResource{

        static $inject:string[] = ['$sce'];
        static filter($sce:ng.ISCEService){
            return (value: any)=> {
                return $sce.trustAsResourceUrl(value);
            };
        }
    }
}

 angular
    .module("app")
    .filter("trusted",
        app.filters.TrustResource.filter);

