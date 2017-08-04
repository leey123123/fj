define([
  "app",
  "js/common/common"
], function(app, C) {

  app.controller("citySelectorController", ['$scope', function($scope) {

    var items = C.City

    $scope.contacts = items;
    $scope.hideUnusedLetters = true;

  }])

});