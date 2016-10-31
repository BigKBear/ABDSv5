app.controller('DecryptedVideoCtrl',function($scope, $ionicPopup, $state, $ionicPlatform, $cordovaFile, $ionicHistory) {
  document.addEventListener('deviceready', function () {
    $scope.messageToUser = "Below are the files and folders currently saved on the device in the Videos folder:";
    $scope.encryptDecrypt = "Encrypt";
    $scope.fileLabel = "Choose a file to encrypt:";

    var test_dir = 'ABDSv5/';
    var test_dir1 = 'ABDSv5/Decrypted';
    var test_dir2 = 'ABDSv5/Decrypted/Videos';

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
        
        listDir(cordova.file.externalRootDirectory+"Movies");
        /*if(!listDir(cordova.file.externalRootDirectory+test_dir2)){
          
          $scope.notification = "no files in "+ test_dir2;
        }else{
          listDir(cordova.file.externalRootDirectory+test_dir2);
          listDir(cordova.file.externalRootDirectory);
          $scope.notification = "";
        }*/

        // A confirm dialog before deleting file
       $scope.Delete = function(file) {
         var confirmPopup = $ionicPopup.confirm({
           title: 'Delete '+ file.name+'?',
           template: 'Are you sure you want to delete' + file.name+ '?'
         });

         confirmPopup.then(function(res) {
           if(res) {
             $cordovaFile.removeFile(cordova.file.externalRootDirectory+test_dir2, file.name)
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

    var getDecryptedPassword = function(){
      var cipherParams = CryptoJS.lib.CipherParams.create({
                ciphertext: CryptoJS.enc.Base64.parse(window.localStorage.getItem("EncryptedPassword"))
                });

      var decrypted = CryptoJS.AES.decrypt(
                  cipherParams,
                  $rootScope.base64Key,
                  { iv: $rootScope.iv });
                  $scope.descrString = decrypted.toString(CryptoJS.enc.Utf8);
        
        return decrypted.toString(CryptoJS.enc.Utf8);
    }

    $scope.encrypt = function(file){
        var newLocation = 'ABDSv5/Encrypted/Videos';
        alert($base64.encode('a string'));
        var textFile = $cordovaFile.readAsText(cordova.file.externalRootDirectory+"Movies",file).toString();

      /*  var encryptedFile = CryptoJS.AES.encrypt(
                textFile,
                $rootScope.base64Key,
                { iv: $rootScope.iv });
      
      var fullyEncryptedFile = encryptedFile.ciphertext.toString(CryptoJS.enc.Base64);
      
        alert(textFile);
        (cordova.file.externalRootDirectory+newLocation,file.name, fullyEncryptedFile, true)
        
*/
          //move or write the encrypted file to the SD_Card
         $cordovaFile.moveFile(cordova.file.externalRootDirectory+"Movies", file.name, cordova.file.externalRootDirectory+newLocation, file.name)
          .then(function (success) {
            // success
              alert("File " + file.name+ " moved");
            }, function (error) {
              // error
                alert("File " + file.name+ " NOT moved");
            });
      };
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
});