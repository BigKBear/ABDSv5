app.controller('EncryptedVideoCtrl',function($scope, $rootScope, $base64, $state, $ionicPlatform, $cordovaFile,$ionicHistory) {
  $scope.messageToUser = "Below are the encrypted Videos/Movies you have saved on the SDCard:";
  $scope.encryptDecrypt = "Decrypt";
  $scope.fileLabel = "Choose a video to decrypt";
  $scope.typeBeingViewed = "Encrypted";

  var test_dir = 'ABDSv5/';
  var test_dir1 = 'ABDSv5/Encrypted';
  var test_dir2 = 'ABDSv5/Encrypted/Videos';
 
  document.addEventListener('deviceready', function () {
    var currentPlatform = ionic.Platform.platform();  
    $scope.currentPlatform = currentPlatform;

    $cordovaFile.getFreeDiskSpace()
      .then(function (success) {
         // success in kilobytes
         $scope.freeSpace = success +' kilobytes';
          /*var alertPopup = $ionicPopup.alert({
                title: 'Success!',
                template: 'You have '+sucess+'Kb of free space!'
            });*/
      }, function (error) {
          // error Show pop up stating there is no free space
           /*var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });*/
      });

    $cordovaFile.checkDir(cordova.file.externalRootDirectory, test_dir)
      .then(function (success) {
        // success
        $scope.stepone = 'Directory '+ test_dir +' Exist';
      }, function (error) {
        // error
        $scope.stepone = 'Directory '+ test_dir +' Does not Exist';
        // Create dir 'ABDSv5'
         $cordovaFile.createDir(cordova.file.externalRootDirectory, test_dir, true)
         .then( function(success) {
          console.log('Directory was created: OK');
          $scope.stepone = 'Directory '+test_dir+' was created.';
        }, function(error){
          $scope.stepone ='Directory '+test_dir+' was not created due to ' + error+'.';
        });
      });

    $cordovaFile.checkDir(cordova.file.externalRootDirectory, test_dir1)
      .then(function (success) {
        // success
        $scope.steptwo = 'Directory '+ test_dir1 +' Exist';
      }, function (error) {
        // error
        $scope.steptwo = 'Directory '+ test_dir1 +' Does not Exist';
        // Create dir 'ABDSv5/Encrypted'
        $cordovaFile.createDir(cordova.file.externalRootDirectory, test_dir1, true)
         .then( function(success) {
          console.log('Directory was created: OK');
          $scope.steptwo = 'Directory '+test_dir1+' was created.';
        }, function(error){
          $scope.steptwo ='Directory '+test_dir1+' was not created due to ' + error+'.';
        });
      });

    $cordovaFile.checkDir(cordova.file.externalRootDirectory, test_dir2)
      .then(function (success) {
        // success
        $scope.stepthree = 'Directory '+ test_dir2 +' Exist';
      }, function (error) {
        // error
        $scope.stepone = 'Directory '+ test_dir2 +' Does not Exist';
        // Create dir 'ABDSv5/Encrypted/Videos'
         $cordovaFile.createDir(cordova.file.externalRootDirectory, test_dir2, true)
         .then( function(success) {
          console.log('Directory was created: OK');
          $scope.stepthree = 'Directory '+test_dir2+' was created.';
        }, function(error){
          $scope.stepthree ='Directory '+test_dir2+' was not created due to ' + error+'.';
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
      listDir(cordova.file.externalRootDirectory+test_dir2);



      
    
    
       //$scope.selectedFile = $scope.file;
        $scope.SelectedFile = function() {
          $cordovaFile.copyFile(cordova.file.externalRootDirectory, $scope.file, cordova.file.externalRootDirectory+test_dir2, userFileName+".mp4")
            .then(function (success) {
              // success
              alert("success: " + success);
            }, function (error) {
              // error
              alert("failed");
            });
          setTimeout(function () {
          $scope.$apply(function(){
            $scope.selectedFile = $scope.file;
            alert("hi" + file);

         });
          }, 2000);
       };

       $scope.encrypt = function(userFileName,userSelectedFile){

        alert("Hi " + userFileName +"\n"+ userSelectedFile);
         /*$cordovaFile.copyFile(cordova.file.externalRootDirectory, files, cordova.file.externalRootDirectory+test_dir2, nameForFile+".mp4")
            .then(function (success) {
              // success
              alert("success: " + success);
            }, function (error) {
              // error
              alert("failed");
            });*/
       }

  
    }//end of android platform

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

});//end of EncryptVideoCtrl
