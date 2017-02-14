app.controller('RestoreCtrl', function($scope, $ionicPopup, $state, $ionicPlatform, $cordovaFile, $ionicHistory) {
 
 $scope.titleToShowUser = window.localStorage.getItem("userUsername") +" Home Page";
  //alert('RestoreCtrl');
  //$ionicHistory.clearHistory();
  $scope.restore = function(){
    console.log('Starting to Restore device');
    alert("Restore controller is being worked on")
  };


});