/*The BackupCtrl*/
app.controller('BackupCtrl', function($scope, $ionicPopup, $state, $ionicPlatform, $cordovaFile, $ionicHistory) {
	
  console.log('BackupCtrl');
  $scope.titleToShowUser = window.localStorage.getItem("userUsername") +" Home Page";
  
  $scope.backup = function(){
    console.log('Starting backup');

    //create backup name and folder on SD card
    var ROOT_OF_BACKUP_ANDRECOVERY = 'ABDSv5/';
    var BACKUP = 'ABDSv5/DataBackup';
    var fileSystemPath = cordova.file.externalRootDirectory;

    var ongetFreeDiskSpaceError = function (error) {
        var alertPopup = $ionicPopup.alert({
          title: 'No Free Space!',
          template: 'No free space available or memory is corrupted.'
        });//end of alert popup
    }//end of error free space

     document.addEventListener('deviceready', function () {
      var currentPlatform = ionic.Platform.platform();
    $scope.currentPlatform = "Step 1: You are using "+ currentPlatform + " device.";
    $cordovaFile.getFreeDiskSpace()
      .then(ongetFreeDiskSpaceSuccess, function (error) {
        var alertPopup = $ionicPopup.alert({
          title: 'No Free Space!',
          template: 'No free space available or memory is corrupted.'
        });//end of alert popup
      });//end of error free space
  });


    var ongetFreeDiskSpaceSuccess= function (success) {
           $scope.freeSpace = 'Step 2: You have '+ success +' kilobytes of free space';
    }

    
  };
});