var marketManApp = angular.module('MarketManApp', [
    'MarketManApp.services',
    'MarketManApp.controllers',
    'ngRoute'
  ]);

marketManApp.config(['$routeProvider',function ($routeProvider) {
    $routeProvider.
	when("/", 
        {
            templateUrl: "views/market-man.html", 
            controller: "userController"
        }).
	when("/details", 
        {
            templateUrl: "views/marketman-details.html", 
            controller: "userDetailController"
        }).
	otherwise({redirectTo: '/'});
}]);