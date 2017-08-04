define([
  "app"
],function(app){

  app.factory('countService', ['$timeout', function ($timeout) {
    var timer;
    var countDown = {
      time: 120,
      set: function (val) {
        var value = val || 120
        this.time = value;
      },
      start: function (val) {
        var that = this;
        if (that.time <= 0) {
          $timeout.cancel(timer);
          return false;
        }
        timer = $timeout(function() {
          that.time--;
          that.start();
        }, 1000);

      },
      cancel: function () {
        $timeout.cancel(timer);
      }

    }

    return countDown;

  }])

});