'use strict';

juke.controller('AlbumCtrl', function ($scope, $http, $rootScope, $log,
                                       StatsFactory, FindAlbum) {

  // load our initial data
  FindAlbum.fetchById(1)
  .then(function (album) {

    album.imageUrl = '/api/albums/' + album.id + '/image';
    album.songs.forEach(function (song, i) {
      song.audioUrl = '/api/songs/' + song.id + '/audio';
      song.albumIndex = i;
    });
    $scope.album = album;

    // using statsfactory
    StatsFactory.totalTime(album)
    .then(function(durationSum) {
      var durationSumFormatted = Math.floor(durationSum);
      $scope.fullDuration = durationSumFormatted;
    })
    .catch($log.error);

  })
  .catch($log.error); // $log service can be turned on and off; also, pre-bound

  // main toggle
  $scope.toggle = function (song) {
    if ($scope.playing && song === $scope.currentSong) {
      $rootScope.$broadcast('pause');
    } else $rootScope.$broadcast('play', song);
  };

  // incoming events (from Player, toggle, or skip)
  $scope.$on('pause', pause);
  $scope.$on('play', play);
  $scope.$on('next', next);
  $scope.$on('prev', prev);

  // functionality
  function pause () {
    $scope.playing = false;
  }
  function play (event, song) {
    $scope.playing = true;
    $scope.currentSong = song;
  };

  // a "true" modulo that wraps negative to the top of the range
  function mod (num, m) { return ((num % m) + m) % m; };

  // jump `interval` spots in album (negative to go back, default +1)
  function skip (interval) {
    if (!$scope.currentSong) return;
    var index = $scope.currentSong.albumIndex;
    index = mod( (index + (interval || 1)), $scope.album.songs.length );
    $scope.currentSong = $scope.album.songs[index];
    if ($scope.playing) $rootScope.$broadcast('play', $scope.currentSong);
  };
  function next () { skip(1); };
  function prev () { skip(-1); };

});


// albums view

juke.controller('albums', function ($scope, $http, $rootScope, $log, StatsFactory, FindAlbum) {
  FindAlbum.fetchAll()
  .then(function(allAlbumsData){
    $scope.albums = [];
    allAlbumsData.forEach(function(value){
      value.imageUrl = '/api/albums/' + value.id + '/image';
      $scope.albums.push(value);
    })
    console.log(allAlbumsData);
  })
  .catch($log.error)
});
