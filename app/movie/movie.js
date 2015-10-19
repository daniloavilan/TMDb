'use strict';

angular.module('TMDb.movie', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/movie/:movieId', {
    templateUrl: 'movie/movie.html',
    controller: 'MovieCtrl'
  });
}])

.controller('MovieCtrl', ['$scope', '$http', '$routeParams', '$sce',
function($scope, $http, $routeParams, $sce) {
    $scope.movieId = $routeParams.movieId;
    var baseUrl = 'http://api.themoviedb.org/3/movie/';
    var apiKey = 'api_key=ada470e76a01e99d9964f49a93feb6e8';
    
    //Basic Data
    $http.get(baseUrl + $scope.movieId  + '?' + apiKey)
    .success(function(data) {
        $scope.movie = data;
    });
    
    //Cast
    $http.get(baseUrl + $scope.movieId  + '/credits?' + apiKey)
    .success(function(data) {
        $scope.cast = data.cast;
    });
    
    //Trailer
    $http.get(baseUrl + $scope.movieId  + '/videos?' + apiKey)
    .success(function(data) {
        if(data.results.length > 0)
        $scope.trailer = data.results[0];
    });
    
    $scope.getTrailerSrc = function(){
        if($scope.trailer.site == "YouTube")
            return $sce.trustAsResourceUrl(
                "//www.youtube.com/embed/" + $scope.trailer.key + "?rel=0");
        return "";
    }
}]);