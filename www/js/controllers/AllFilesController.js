app.controller('AllFilesCtrl', function($scope, $ionicPlatform){  
  $scope.name = 'Allfiles'; 
  $scope.messageToUser = "Below are all the files and folders in the external Root Directory of the device:";

   var currentPlatform = ionic.Platform.platform();  
    $scope.currentPlatform = currentPlatform;

    $ionicPlatform.ready(function() {
      if (ionic.Platform.isAndroid()) {
        function listDir(path){
          window.resolveLocalFileSystemURL(path,
            function (fileSystem) {
              var reader = fileSystem.createReader();
              reader.readEntries(
                function (entries) {
                  var videodirectories = entries;
                  $scope.videodirectories = entries;
          
              },
              function (err) {
                console.log(err);
              }
            );
          }, function (err) {
            console.log(err);
          });
        }
        
        listDir(cordova.file.externalRootDirectory);

        /*if(!listDir(cordova.file.externalRootDirectory)){
          $scope.notification = "no files in ";
          $scope.apply();
        }else{
          listDir(cordova.file.externalRootDirectory);
          $scope.notification = "";
          $scope.apply();
        }  */
      }

        if (ionic.Platform.isIOS()) {
        
        console.log('cordova.file.documentsDirectory: ' + cordova.file.documentsDirectory);
        
        fileTransferDir = cordova.file.documentsDirectory;
        fileDir = '';
        console.log('IOS FILETRANSFERDIR: ' + fileTransferDir);
        console.log('IOS FILEDIR: ' + fileDir);
      }

      if (ionic.Platform.isAndroid() || ionic.Platform.isIOS()) {
              
      }
  });
});