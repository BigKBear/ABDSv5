app.controller('SettingsCtrl', function($scope, $ionicPopup, $state, $ionicPlatform, $cordovaFile, $ionicHistory) {
 
  console.log('SettingsCtrl');
  //$ionicHistory.clearHistory();
  $scope.restore = function(){
    console.log('Starting to Restore device');
  };


});