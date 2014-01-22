require([
  '$api/models',
  '$api/search#Search'
], function(models, Search) {
  'use strict';

  var date_change = function() {
    clearTimeout(alarmTimeout);

    alarm_date = date(this.value);
    $('#countdown').countdown('destroy').countdown({ until: alarm_date });

    var time_diff = alarm_date.getTime() - (new Date()).getTime();
    if ( time_diff > 0 ) {
      alarmTimeout = setTimeout(function() {
        var track = models.Track.fromURI(track_uri);
        models.player.playTrack(track);
      }, time_diff);
    }
  };

  var track_change = function() {
    var search = Search.search(this.value);

    search.tracks.snapshot(0, 1).done(function(snapshot) {
      if (snapshot.length > 0) track_uri = snapshot.get(0).uri;
    });
  };

  var alarmTimeout;
  var alarm_date;
  var track_uri;
  document.getElementById('date').addEventListener('keyup', date_change);
  document.getElementById('track').addEventListener('keyup', track_change);
});
