app.controller('DecryptedPictureCtrl',function($scope, $ionicPopup, $state, $ionicPlatform, $cordovaFile, $ionicHistory) {
  $scope.messageToUser = "Below are the files and folders currently saved on the device in the Pictures folder:";
  $scope.encryptDecrypt = "Encrypt";
  $scope.fileLabel = "Choose a file to encrypt:";

  var test_dir = 'ABDSv5/';
  var test_dir1 = 'ABDSv5/Decrypted';
  var test_dir2 = 'ABDSv5/Decrypted/Pictures';

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
    
     
      if(!listDir(cordova.file.externalRootDirectory+test_dir2)){
        $scope.notification = "no files in "+ test_dir2;
      }else{
        listDir(cordova.file.externalRootDirectory+test_dir2);
        $scope.notification = "";
      }

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

       $scope.encrypt =function(file){
        alert("Encrypt clicked");
       };

       $scope.selectedFile =function(fileName){
        document.getElementById("uploadBtn").onchange = function () {
          console.log("AHHH"+this.files);
          document.getElementById("uploadFile").value = this.value;
            alert("Encrypt  selectedFile clicked " + this.value);
          };
        };

        $scpe.previewFiles = function(){
          alert("Encrypt  selectedFile clicked ");
           var preview = document.querySelector('#preview');
            var files   = document.querySelector('input[type=file]').files;

           /* function readAndPreview(file) {

              // Make sure `file.name` matches our extensions criteria
              if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
                var reader = new FileReader();

                reader.addEventListener("load", function () {
                  var image = new Image();
                  image.height = 100;
                  image.title = file.name;
                  image.src = this.result;
                  preview.appendChild( image );
                }, false);

                reader.readAsDataURL(file);
              }

            }*/

            if (files) {
              [].forEach.call(files, readAndPreview);
            }
        };
        
        /*if(!file){
          alert("no file selected");
        }else{
          console.log('Selected file: ' + selectedFile.name);
          alert("Encrypt "+fileName+" clicked"+selectedFile);
        }*/
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