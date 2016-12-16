/// <reference path="../../typings/tsd.d.ts" />

namespace app {
    // add "movieResourceMock" dependency in case you want to mock beckend service for retrieving movies
    angular.module("app", ["ui.router", "ct.ui.router.extras.previous", "mp.autoFocus", "common.services"]);
} 

