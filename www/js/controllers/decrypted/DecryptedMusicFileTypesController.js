app.controller('DecryptedMusicCtrl',function($scope, $http, $ionicPopup, $state, $ionicPlatform, $cordovaFile, $ionicHistory) {
    $scope.messageToUser = "Below are the files and folders currently saved on the device in the Music folder:";
    $scope.encryptDecrypt = "Encrypt";
    $scope.fileLabel = "Choose a file to encrypt:";

   
    var test_dir = 'ABDSv5/';
    var test_dir1 = 'ABDSv5/Decrypted';
    var test_dir2 = 'ABDSv5/Decrypted/Music';

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
    
      listDir(cordova.file.externalRootDirectory+"Music");
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

       $scope.encrypt = function(file){
          var encryptedDirectory = 'ABDSv5/Encrypted/Music';

          var path = cordova.file.externalRootDirectory+"Music/"+file.name;

          getFileContentAsBase64(path,function(base64Image){
  //window.open(base64Image);
  console.log(base64Image); 
  alert(base64Image);
  // Then you'll be able to handle the myimage.png file as base64
            });
           /*$cordovaFile.moveFile(cordova.file.externalRootDirectory+test_dir2,file.name, cordova.file.externalRootDirectory+encryptedDirectory,file.name)*/
           $cordovaFile.moveFile(cordova.file.externalRootDirectory+"Music",file.name, cordova.file.externalRootDirectory+encryptedDirectory, file.name)
              .then(function (success) {
                // success
                alert("File " + file.name+ " moved");
              }, function (error) {
                // error
                alert("File " + file.name+ " NOT moved" + error);
              });
            };

       
function getFileContentAsBase64(path,callback){
    window.resolveLocalFileSystemURL(path, gotFile, fail);
            
    function fail(e) {
          alert('Cannot find requested file');
    }

    function gotFile(fileEntry) {
           fileEntry.file(function(file) {
              var reader = new FileReader();
              reader.onloadend = function(e) {
                   var content = this.result;
                   callback(content);
              };
              // The most important point, use the readAsDatURL Method from the file plugin
              reader.readAsDataURL(file);
           });
    }
}

/**
 * Convert a base64 string in a Blob according to the data and contentType.
 * 
 * @param b64Data {String} Pure base64 string without contentType
 * @param contentType {String} the content type of the file i.e (application/pdf - text/plain)
 * @param sliceSize {Int} SliceSize to process the byteCharacters
 * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 * @return Blob
 */
function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

      var blob = new Blob(byteArrays, {type: contentType});
      return blob;
}

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