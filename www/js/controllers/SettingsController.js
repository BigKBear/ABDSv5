app.controller('SettingsCtrl', function($scope, $state, $ionicPlatform, $cordovaFile, $ionicHistory) {
 
  console.log('Settings controller activated');
  $scope.titleToShowUser = window.localStorage.getItem("userUsername") +" Settings";
  //$ionicHistory.clearHistory();
  /*$scope.restore = function(){
    console.log('Starting to Restore device');
    $state.go('login');
  };
*/

});