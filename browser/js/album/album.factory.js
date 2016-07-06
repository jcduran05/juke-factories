juke.factory('StatsFactory', function ($q) {
  var statsObj = {};
  statsObj.totalTime = function (album) {
    var audio = document.createElement('audio');
    return $q(function (resolve, reject) {
      var sum = 0;
      var n = 0;
      function resolveOrRecur () {
        if (n >= album.songs.length) resolve(sum);
        else audio.src = album.songs[n++].audioUrl;
      }
      audio.addEventListener('loadedmetadata', function () {
        sum += audio.duration;
        resolveOrRecur();
      });
      resolveOrRecur();
    });
  };
  return statsObj;
});

juke.factory('FindAlbum', function($q, $http, $log) {

    var findAlbumObj = {};

    findAlbumObj.fetchAll = function() {
      return $http.get('/api/albums/')
      .then(function (res) { return res.data; })
      // .then(function (albums) {
      //   return $http.get('/api/albums/' + albums[0].id); // temp: get one
      // })
      .catch($log.error);
    }

    findAlbumObj.fetchById = function(id) {
      return $http.get('/api/albums/' + id) // temp: get one
      .then(function (res) {
        return res.data;
      })
      .catch($log.error);
    }

    return findAlbumObj;
});
