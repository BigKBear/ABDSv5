app.controller('AllFilesCtrl', function($scope, $ionicPlatform){  
  $scope.name = 'Allfiles'; 
   var currentPlatform = ionic.Platform.platform();  
  $scope.currentPlatform = currentPlatform;
});