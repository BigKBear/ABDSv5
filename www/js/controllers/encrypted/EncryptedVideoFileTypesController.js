app.controller('EncryptedVideoCtrl',function($scope, $ionicPopup, $timeout, $state, $ionicPlatform, $cordovaFile, $ionicHistory) {
    $scope.messageToUser = "Below are the encrypted Videos/Movies you have saved on the SDCard:";
    $scope.encryptDecrypt = "Decrypt";
    $scope.fileLabel = "Choose a video to decrypt";
    $scope.typeBeingViewed = "Encrypted";

    var SD_CARD_ROOT_DIR = 'ABDSv5/';
    var SD_CARD_ENCRYPTED_DIR = 'ABDSv5/Encrypted';
    var SD_CARD_ENCRYPTED_VIDEO_DIR = 'ABDSv5/Encrypted/Videos';
   
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

      $cordovaFile.checkDir(cordova.file.externalRootDirectory, SD_CARD_ROOT_DIR)
        .then(function (success) {
          
          $scope.stepone = 'Directory '+ SD_CARD_ROOT_DIR +' Exist';
        }, function (error) {
          
          $scope.stepone = 'Directory '+ SD_CARD_ROOT_DIR +' Does not Exist';
          
           $cordovaFile.createDir(cordova.file.externalRootDirectory, SD_CARD_ROOT_DIR, true)
           .then( function(success) {
            console.log('Directory was created: OK');
            $scope.stepone = 'Directory '+SD_CARD_ROOT_DIR+' was created.';
          }, function(error){
            $scope.stepone ='Directory '+SD_CARD_ROOT_DIR+' was not created due to ' + error+'.';
          });
        });

      $cordovaFile.checkDir(cordova.file.externalRootDirectory, SD_CARD_ENCRYPTED_DIR)
        .then(function (success) {
          
          $scope.steptwo = 'Directory '+ SD_CARD_ENCRYPTED_DIR +' Exist';
        }, function (error) {
          
          $scope.steptwo = 'Directory '+ SD_CARD_ENCRYPTED_DIR +' Does not Exist';
          
          $cordovaFile.createDir(cordova.file.externalRootDirectory, SD_CARD_ENCRYPTED_DIR, true)
           .then( function(success) {
            console.log('Directory was created: OK');
            $scope.steptwo = 'Directory '+SD_CARD_ENCRYPTED_DIR+' was created.';
          }, function(error){
            $scope.steptwo ='Directory '+SD_CARD_ENCRYPTED_DIR+' was not created due to ' + error+'.';
          });
        });

      $cordovaFile.checkDir(cordova.file.externalRootDirectory, SD_CARD_ENCRYPTED_VIDEO_DIR)
        .then(function (success) {
          
          $scope.stepthree = 'Directory '+ SD_CARD_ENCRYPTED_VIDEO_DIR +' Exist';
        }, function (error) {
          
          $scope.stepone = 'Directory '+ SD_CARD_ENCRYPTED_VIDEO_DIR +' Does not Exist';
          
           $cordovaFile.createDir(cordova.file.externalRootDirectory, SD_CARD_ENCRYPTED_VIDEO_DIR, true)
           .then( function(success) {
            console.log('Directory was created: OK');
            $scope.stepthree = 'Directory '+SD_CARD_ENCRYPTED_VIDEO_DIR+' was created.';
          }, function(error){
            $scope.stepthree ='Directory '+SD_CARD_ENCRYPTED_VIDEO_DIR+' was not created due to ' + error+'.';
          });
        });     
      

    $ionicPlatform.ready(function() {
      if (ionic.Platform.isAndroid()) {
        function listDir(path){
          window.resolveLocalFileSystemURL(path,
            function (fileSystem) {
              var reader = fileSystem.createReader();
              reader.readEntries(
                function (entries) {
                  var videodirectories = entries;
                  $scope.videodirectories = videodirectories;
                  window.localStorage.setItem('newsArticle12', localData);
                  
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
        listDir(cordova.file.externalRootDirectory+SD_CARD_ENCRYPTED_VIDEO_DIR);    
      
      // A confirm dialog before deleting file
       $scope.Delete = function(file) {
         var confirmPopup = $ionicPopup.confirm({
           title: 'Delete '+ file.name+'?',
           template: 'Are you sure you want to delete' + file.name+ '?'
         });

         confirmPopup.then(function(res) {
           if(res) {
             $cordovaFile.removeFile(cordova.file.externalRootDirectory+SD_CARD_ENCRYPTED_VIDEO_DIR, file.name)
              .then(function (success) {
                // success
                alert("file was deleted");
                $state.go('encrypted_tabs.home');
              }, function (error) {
              // error
              alert("file was not deleted");
              $state.go('encrypted_tabs.home');
            });
           } else {
             alert("file "+file.name+" was not deleted");
           }
         });
       };

          $scope.SelectedFile = function() {
            $cordovaFile.copyFile(cordova.file.externalRootDirectory, $scope.file, cordova.file.externalRootDirectory+SD_CARD_ENCRYPTED_VIDEO_DIR, userFileName+".mp4")
              .then(function (success) {
                
                alert("success: " + success);
              }, function (error) {
                
                alert("failed");
              });
            $timeout(function () {
            $scope.$apply(function(){
              $scope.selectedFile = $scope.file;
              alert("hi" + file);
           });
            }, 2000);
         };

         $scope.Decrypt = function(file){
          var decryptedDirectory = 'ABDSv5/Decrypted/Videos';
           /*$cordovaFile.moveFile(cordova.file.externalRootDirectory+SD_CARD_ENCRYPTED_VIDEO_DIR,file.name, cordova.file.externalRootDirectory+decryptedDirectory,file.name)*/
           $cordovaFile.moveFile(cordova.file.externalRootDirectory+SD_CARD_ENCRYPTED_VIDEO_DIR,file.name, cordova.file.externalRootDirectory+"Movies")
              .then(function (success) {
                // success
                alert("File " + file.name+ " moved");
                $timeout(function () {
                  $state.go('tabs.home');
                },1000);
              }, function (error) {
                // error
                alert("File " + file.name+ " NOT moved" + error);
                $timeout(function () {
                  $state.go('tabs.home');
                },1000);
              });
         };
      }//end of android platform

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
});//end of EncryptVideoCtrl