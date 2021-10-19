angular.module('MarketManApp.services', []).
  factory('userAPIservice', function($http) {

    var userAPI = {};

    userAPI.getUser = function() {
      return $http({
        method: 'GET', 
        url: 'https://randomuser.me/api/?results=30'
      });
    }

    return userAPI;
  });