'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {

  // initialize audio player (note this kind of DOM stuff is odd for Angular)
  // var audio = document.createElement('audio');
  // audio.addEventListener('ended', function () {
  //   $scope.next();
  //   // $scope.$apply(); // triggers $rootScope.$digest, which hits other scopes
  //   $scope.$evalAsync(); // likely best, schedules digest if none happening
  // });

  // audio.addEventListener('timeupdate', function () {
  //   $scope.progress = 100 * audio.currentTime / audio.duration;
  //   // $scope.$digest(); // re-computes current template only (this scope)
  //   $scope.$evalAsync(); // likely best, schedules digest if none happening
  // });

  // state
  $scope.currentSong = PlayerFactory.currentSong;
  $scope.playing = PlayerFactory.playing;

  $scope.getCurrentSong = PlayerFactory.getCurrentSong;
  $scope.isPlaying = PlayerFactory.isPlaying;

  // main toggle
  $scope.toggle = function(song) {
    if (!PlayerFactory.isPlaying()) {
      PlayerFactory.resume();
    } else {
      PlayerFactory.pause();
    }

    $scope.playing = PlayerFactory.playing;
    $scope.currentSong = PlayerFactory.currentSong;
  }


  // incoming events (from Album or toggle)
  // $scope.$on('pause', pause);
  // $scope.$on('play', play);

  // functionality

  // outgoing events (to Album… or potentially other characters)
  // $scope.next = function () { pause(); $rootScope.$broadcast('next'); };
  // $scope.prev = function () { pause(); $rootScope.$broadcast('prev'); };

  $scope.next = PlayerFactory.next;
  $scope.prev = PlayerFactory.previous;
  $scope.getProgress = PlayerFactory.getProgress;

});
