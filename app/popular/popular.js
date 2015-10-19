'use strict';

angular.module('TMDb.popular', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/popular', {
    templateUrl: 'popular/popular.html',
    controller: 'PopularCtrl'
  });
}])

.controller('PopularCtrl', ['$scope', '$http', '$routeParams',
function($scope, $http, $routeParams) {
    var baseUrl = 'http://api.themoviedb.org/3/movie/popular';
    var apiKey = 'api_key=ada470e76a01e99d9964f49a93feb6e8';
        
    //Movies
    $http.get(baseUrl + '?' + apiKey)
    .success(function(data) {
        $scope.movies = data.results;
    });
}]);