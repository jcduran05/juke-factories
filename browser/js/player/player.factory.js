'use strict';

juke.factory('PlayerFactory', function($rootScope){
  // non-UI logic in here
  var playerFactory = {
    playing : false,
    currentSong : null,
    progress : 0
  };

  var audio = document.createElement('audio');

  playerFactory.pause = function () {
    playerFactory.playing = false;
    audio.pause();
  }

  playerFactory.start = function (song, arrayOfSongs){
    // stop existing audio (e.g. other song) in any case
    if (arrayOfSongs) {
      playerFactory.placeInAlbum = arrayOfSongs.indexOf(song);
      playerFactory.album = arrayOfSongs;
    }
    playerFactory.pause();
    playerFactory.playing = true;
    // resume current song
    if (song === playerFactory.currentSong) return audio.play();
    // enable loading new song
    playerFactory.currentSong = song;
    audio.src = song.audioUrl;
    audio.load();
    audio.play();
  }

  playerFactory.seek = function (decimal) {
    audio.currentTime = audio.duration * decimal;
  }

  playerFactory.handleProgressClick = function (evt) {
    seek(evt.offsetX / evt.currentTarget.scrollWidth);
  };

  playerFactory.toggle = function (song) {
    if (playerFactory.playing) playerFactory.pause();
    else playerFactory.play();
  };

  playerFactory.resume = function(){
    audio.play();
    playerFactory.playing = true;
  }

  playerFactory.isPlaying = function(){
    if (playerFactory.playing) {
      return true;
    }else{
      return false;
    }
  }

  playerFactory.getCurrentSong = function(){
    return playerFactory.currentSong;
  }

  playerFactory.next = function(){
    if (playerFactory.placeInAlbum === playerFactory.album.length -1) {
      playerFactory.placeInAlbum = 0;
    }else{
      playerFactory.placeInAlbum++;
    }
    playerFactory.currentSong = playerFactory.album[playerFactory.placeInAlbum];
    playerFactory.start(playerFactory.currentSong, playerFactory.album);
  }

  playerFactory.previous = function(){
    if (playerFactory.placeInAlbum === 0) {
      playerFactory.placeInAlbum = playerFactory.album.length -1 ;
    }else{
      playerFactory.placeInAlbum--;
    }
    playerFactory.currentSong = playerFactory.album[playerFactory.placeInAlbum];
    playerFactory.start(playerFactory.currentSong, playerFactory.album);
  }


audio.addEventListener('timeupdate', function () {
      playerFactory.progress = audio.currentTime / audio.duration;
      $rootScope.$evalAsync();
});
  playerFactory.getProgress = function(){
    // return playerFactory.progress;
    return playerFactory.progress;
  }

  return playerFactory;
});
