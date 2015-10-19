'use strict';

angular.module('TMDb.person', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/person/:personId', {
    templateUrl: 'person/person.html',
    controller: 'PersonCtrl'
  });
}])

.controller('PersonCtrl', ['$scope', '$http', '$routeParams',
function($scope, $http, $routeParams) {
    $scope.personId = $routeParams.personId;
    var baseUrl = 'http://api.themoviedb.org/3/person/';
    var apiKey = 'api_key=ada470e76a01e99d9964f49a93feb6e8';
    
    //Person Data
    $http.get(baseUrl + $scope.personId  + '?' + apiKey)
    .success(function(data) {
        $scope.person = data;
    });
    
    //Movies
    $http.get(baseUrl + $scope.personId  + '/movie_credits?' + apiKey)
    .success(function(data) {
        $scope.movies = data.cast;
    });
}]);