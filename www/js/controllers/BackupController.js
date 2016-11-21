app.controller('BackupCtrl', function($scope, $ionicPopup, $state, $ionicPlatform, $cordovaFile, $ionicHistory) {
	
  console.log('BackupCtrl');
  //$ionicHistory.clearHistory();
  
  $scope.backup = function(){
    console.log('Starting backup');

    //create backup name and folder on SD card
    var ROOT_OF_BACKUP_ANDRECOVERY = 'ABDSv5/';
    var BACKUP = 'ABDSv5/Encrypted';

     document.addEventListener('deviceready', function () {
      var currentPlatform = ionic.Platform.platform();  
      $scope.currentPlatform = currentPlatform;

      $cordovaFile.getFreeDiskSpace()
        .then(function (success) {
           $scope.freeSpace = success +' kilobytes';
        }, function (error) {
             var alertPopup = $ionicPopup.alert({
                  title: 'No Free Space!',
                  template: 'No free space available.'
              });
        });

  });


};
});