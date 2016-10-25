app.controller('DeviceCtrl', function($scope) {

  document.addEventListener('deviceready', function() {
    console.log('device is ' + angular.toJson(device));
    $scope.$apply(function() {
      $scope.device = device;
    });
  });
$ionicHistory.clearHistory();
});//end of DeviceCtrl