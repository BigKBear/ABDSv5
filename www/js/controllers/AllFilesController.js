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
                //window.localStorage.setItem('newsArticle12', localData);
                
                /*var localData = JSON.parse(window.localStorage.getItem('newsArticle12');
                  $.each(function(key, value){
                    //handle the data
                  });*/
            },
            function (err) {
              console.log(err);
            }
          );
        }, function (err) {
          console.log(err);
        }
      );
    }
    
     
      //example: list of directories on the root of the device.
      
      if(!listDir(cordova.file.externalRootDirectory)){
        //alert("no files in "+ test_dir2);
        $scope.notification = "no files in "+ test_dir2;
      }else{
        listDir(cordova.file.externalRootDirectory);
        $scope.notification = "";
      } 
    }

      if (ionic.Platform.isIOS()) {
      // if running on IOS
      console.log('cordova.file.documentsDirectory: ' + cordova.file.documentsDirectory);
      // I use cordova.file.documentsDirectory because this url is for IOS (NOT backed on iCloud) devices
      fileTransferDir = cordova.file.documentsDirectory;
      fileDir = '';
      console.log('IOS FILETRANSFERDIR: ' + fileTransferDir);
      console.log('IOS FILEDIR: ' + fileDir);
    }

    if (ionic.Platform.isAndroid() || ionic.Platform.isIOS()) {
      // Create dir if on android or IOS
      
    }    
  });//end of ionicplatform ready
});