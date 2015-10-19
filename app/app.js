'use strict';

// Declare app level module which depends on views, and components
angular.module('TMDb', [
    'angucomplete-alt',
    'ngRoute',
    'TMDb.person',
    'TMDb.movie',
    'TMDb.popular'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/popular'});
}])
.controller('SearchCtrl', ['$scope', '$http', '$location',
function($scope, $http, $location){
        
    $scope.selectedItem = function(selected) {
      if (selected) {
        $location.path( '/'
            + selected.originalObject.media_type
            + '/'
            + selected.originalObject.id);
      } else {
        console.log('cleared');
      }
    };
    
    $scope.addImgUrl = function(data){
        var baseUrl = "http://image.tmdb.org/t/p/w45";
        var results = data.results;
        for(var i=0; i < results.length; i++){
            switch(results[i].media_type){
                case "person":
                    if(results[i].profile_path != null)
                        results[i].imgUrl = baseUrl + results[i].profile_path;
                    break;
                default:
                    if(results[i].poster_path != null)
                        results[i].imgUrl = baseUrl + results[i].poster_path;
                    break;
            }
            
        }
        data.results = results;
        return data;
    }
    
}]);