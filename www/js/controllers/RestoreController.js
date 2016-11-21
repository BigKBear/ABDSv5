app.controller('RestoreCtrl', function($scope, $ionicPopup, $state, $ionicPlatform, $cordovaFile, $ionicHistory) {
 
  console.log('RestoreCtrl');
  //$ionicHistory.clearHistory();
  $scope.restore = function(){
    console.log('Starting to Restore device');
  };


});