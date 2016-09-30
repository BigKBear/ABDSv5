app.controller('DeviceCtrl', function($scope){
	
  document.addEventListener('deviceready', function() {
    console.log('device is ' + angular.toJson(device));
    //modify the scope to update the digest loop and the view will be updated
    $scope.$apply(function() {
      $scope.device = device;
    });
  });
});