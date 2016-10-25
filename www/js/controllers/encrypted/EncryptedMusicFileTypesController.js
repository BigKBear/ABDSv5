app.controller('EncryptedMusicCtrl',function($scope, $state, $ionicPlatform, $cordovaFile) {
    $scope.messageToUser = "Below are the encrypted Music you have saved on the SDCard:";
    $scope.encryptDecrypt = "Decrypt";
    $scope.fileLabel = "Choose a music file to decrypt";
    $scope.typeBeingViewed = "Encrypted";

    var test_dir = 'ABDSv5/';
    var test_dir1 = 'ABDSv5/Encrypted';
    var test_dir2 = 'ABDSv5/Encrypted/Music';

    $cordovaFile.checkDir(cordova.file.externalRootDirectory, test_dir)
      .then(function (success) {
        $scope.stepone = 'Directory '+ test_dir +' Exist';
      }, function (error) {
        
        $scope.stepone = 'Directory '+ test_dir +' Does not Exist';
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
        
        $scope.steptwo = 'Directory '+ test_dir1 +' Exist';
      }, function (error) {
        
        $scope.steptwo = 'Directory '+ test_dir1 +' Does not Exist';
        
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
        
        $scope.stepthree = 'Directory '+ test_dir2 +' Exist';
      }, function (error) {
        
        $scope.stepone = 'Directory '+ test_dir2 +' Does not Exist';
        
         $cordovaFile.createDir(cordova.file.externalRootDirectory, test_dir2, true)
         .then( function(success) {
          console.log('Directory was created: OK');
          $scope.stepthree = 'Directory '+test_dir2+' was created.';
        }, function(error){
          $scope.stepthree ='Directory '+test_dir2+' was not created due to ' + error+'.';
        });
      });

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
      listDir(cordova.file.externalRootDirectory+test_dir2);
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