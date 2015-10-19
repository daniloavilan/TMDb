'use strict';

describe('TMDb module', function() {

  beforeEach(module('TMDb'));

  describe('SearchCtrl controller', function(){
    var scope, ctrl, data;
    beforeEach(inject(function($controller) {
        scope = {};
        ctrl = $controller('SearchCtrl', {$scope:scope});
        data ={"results": [
            {
              "poster_path": "/poster.jpg",
              "media_type": "movie"
            },
            {
              "profile_path": "/profile.jpg",
              "media_type": "person"
            }
        ]};
            
    }));

    
    it('should define the SearchCtrl and two functions', inject(function($controller) {
      expect(ctrl).toBeDefined();
      expect(scope.selectedItem).toBeDefined();
      expect(scope.addImgUrl).toBeDefined();
    }));
    
    it('should add ImgUrl to a results list', inject(function($controller) {
        var baseUrl = "http://image.tmdb.org/t/p/w45";
        var modifiedList = scope.addImgUrl(data);        
        expect(modifiedList.results[0].imgUrl).toBe(baseUrl + data.results[0].poster_path);
        expect(modifiedList.results[1].imgUrl).toBe(baseUrl + data.results[1].profile_path);
    }));

  });
});