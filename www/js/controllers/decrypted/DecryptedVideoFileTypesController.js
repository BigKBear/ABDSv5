app.controller('DecryptedVideoCtrl',function($scope, $state, $ionicPlatform, $cordovaFile) {
    $scope.messageToUser = "Below are the files and folders currently saved on the device in the Videos folder:";

    //var test_dir = 'DCMIABDSv5';
    var test_dir = 'ABDSv5/';
    var test_dir1 = 'ABDSv5/Decrypted';
    var test_dir2 = 'ABDSv5/Decrypted/Videos';

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
      listDir(cordova.file.externalRootDirectory);
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
      // Create dir test
      /*$cordovaFile.createDir(cordova.file.externalRootDirectory,'testvid',false)
       .then( function(success) {
        console.log('Directory was created: OK');
        $scope.filedirectory = 'Directory was created: OK';
      }, function(error){
        $scope.filedirectory ='Directory was not created: OK';
      });*/
    }
    
  });//end of ionicplatform ready
});//end of EncryptVideoCtrl