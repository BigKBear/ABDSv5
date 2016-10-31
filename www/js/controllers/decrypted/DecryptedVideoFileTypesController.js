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

       $scope.encryptSelectedFile =function(fileName){
        //var file =  $scope.editItem._attachments_uri.image ;
        if(!fileName){
          alert("No file name was given so the file will be encrypted using the original name \"here show name\"");
          $scope.setFiles = function(files)
          {
          $scope.$apply(function() {
          var file = files[0];
          var reader = new FileReader();
          reader.onload = function(e) {
          console.log(e.target.result);
          alert(e.target.result);
          };
          reader.readAsText(file);
          alert(file.name);
          });
          }
        }else{
          alert("The file will be encrypted using " +fileName+" as the file name");
            //filePath is the absolute path to the file(/mnt/sdcard/...)
            /*window.plugins.Base64.encodeFile(filePath, function(base64){
                console.log('file base64 encoding: ' + base64);
            });*/

            /*var encrypted = CryptoJS.AES.encrypt(
                    fileAsText,
                    $rootScope.base64Key,
                    { iv: $rootScope.iv });
              alert('encrypted = ' + encrypted);*/

            /*if(!file){
              alert("no file selected");
            }else{
              alert('cordova.file.documentsDirectory: ' + file);
              alert("Encrypt "+fileName+" clicked"+file);
            }*/
            $scope.setFiles = function(files)
          {
          $scope.$apply(function() {
          var file = files[0];
          var reader = new FileReader();
          reader.onload = function(e) {
          console.log(e.target.result);
          alert(e.target.result);
          };
          reader.readAsText(file);
          alert(file.name);
          });
          }
        }
       };

       $scope.encrypt = function(file){
        alert(file.name + " " + file.filesystem );
        console.log("THE SELECTED FILE: "+ file);
        /*$cordovaFile.moveFile(cordova.file.externalRootDirectory+test_dir2,file.name, cordova.file.externalRootDirectory+encryptedDirectory,file.name)*/
        $cordovaFile.moveFile(cordova.file.externalRootDirectory+"Movies",file.name, cordova.file.externalRootDirectory+encryptedDirectory)
          .then(function (success) {
            // success
              alert("File " + file.name+ " moved");
            }, function (error) {
              // error
                alert("File " + file.name+ " NOT moved" + error);
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