juke.controller('Sidebar', function ($scope, $rootScope){
  $scope.viewAlbums = function(){
    $rootScope.$broadcast("showAlbums", true);
  }
});
