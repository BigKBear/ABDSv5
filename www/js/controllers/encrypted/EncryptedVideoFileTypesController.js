app.controller('EncryptedVideoCtrl',function($scope, $state, $ionicPlatform, $cordovaFile,$ionicHistory) {
/*
     encrypt: function(message, password) {
            var salt = forge.random.getBytesSync(128);
            var key = forge.pkcs5.pbkdf2(password, salt, 4, 16);
            var iv = forge.random.getBytesSync(16);
            var cipher = forge.cipher.createCipher('AES-CBC', key);
            cipher.start({iv: iv});
            cipher.update(forge.util.createBuffer(message));
            cipher.finish();
            var cipherText = forge.util.encode64(cipher.output.getBytes());
            return {cipher_text: cipherText, salt: forge.util.encode64(salt), iv: forge.util.encode64(iv)};
        },

        decrypt: function(cipherText, password, salt, iv, options) {
            var key = forge.pkcs5.pbkdf2(password, forge.util.decode64(salt), 4, 16);
            var decipher = forge.cipher.createDecipher('AES-CBC', key);
            decipher.start({iv: forge.util.decode64(iv)});
            decipher.update(forge.util.createBuffer(forge.util.decode64(cipherText)));
            decipher.finish();
            if(options !== undefined && options.hasOwnProperty("output") && options.output === "hex") {
                return decipher.output.toHex();
            } else {
                return decipher.output.toString();
            }
        }


*/
  
  /*$scope.files={};*/

  document.addEventListener('deviceready', function () {
    var currentPlatform = ionic.Platform.platform();  
    $scope.currentPlatform = currentPlatform;
    $scope.messageToUser = "Below are the encrypted Videos/Movies you have saved on the SDCard:";
    $scope.encryptDecrypt = "Decrypt";
    $scope.fileLabel = "Choose a file to encrypt:";
    $scope.folderLabel="Choose a folder to encrypt:";

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
  
    //var test_dir = 'DCMIABDSv5';
    var test_dir = 'ABDSv5/';
    var test_dir1 = 'ABDSv5/Encrypted';
    var test_dir2 = 'ABDSv5/Encrypted/Videos';

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

      /*$scope.hash = CryptoJS.MD5("Message");*/

     document.getElementById("createFile").addEventListener("click", createFile);
      document.getElementById("writeFile").addEventListener("click", writeFile);
      document.getElementById("readFile").addEventListener("click", readFile);
      document.getElementById("removeFile").addEventListener("click", removeFile);

      function createFile() {
       var type = window.TEMPORARY;
       var size = 5*1024*1024;

       window.requestFileSystem(type, size, successCallback, errorCallback)

       function successCallback(fs) {
          fs.root.getFile('log.txt', {create: true, exclusive: true}, function(fileEntry) {
             alert('File creation successfull!')
          }, errorCallback);
       }

       function errorCallback(error) {
          alert("ERROR: " + error.code)
       }
      
    }

function writeFile() {
   var type = window.TEMPORARY;
   var size = 5*1024*1024;

   window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {

      fs.root.getFile('log.txt', {create: true}, function(fileEntry) {

         fileEntry.createWriter(function(fileWriter) {
            fileWriter.onwriteend = function(e) {
               alert('Write completed.');
            };

            fileWriter.onerror = function(e) {
               alert('Write failed: ' + e.toString());
            };

            var blob = new Blob(['Lorem Ipsum'], {type: 'text/plain'});
            fileWriter.write(blob);
         }, errorCallback);

      }, errorCallback);

   }

   function errorCallback(error) {
      alert("ERROR: " + error.code)
   }
  
}


function readFile() {
   var type = window.TEMPORARY;
   var size = 5*1024*1024;

   window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {

      fs.root.getFile('log.txt', {}, function(fileEntry) {

         fileEntry.file(function(file) {
            var reader = new FileReader();

            reader.onloadend = function(e) {
               var txtArea = document.getElementById('textarea');
               txtArea.value = this.result;
            };

            reader.readAsText(file);

         }, errorCallback);

      }, errorCallback);
   }

   function errorCallback(error) {
      alert("ERROR: " + error.code)
   }
  
} 




      // taken from 
      //http://stackoverflow.com/questions/28937878/cordova-list-all-files-from-application-directory-www
      function listDir(path){
        window.resolveLocalFileSystemURL(path,
          function (fileSystem) {
            var reader = fileSystem.createReader();
            reader.readEntries(
              function (entries) {
                console.log("ENTRIES: "+ entries);
                var videodirectories = entries;
                $scope.videodirectories = videodirectories;
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
     
     /*encryptFile(String inputPath, String inputFile, String outputPath) {
        try {
            //create output directory if it doesn't exist
            File dir = new File (outputPath);
            if (!dir.exists())
            {
                dir.mkdirs();
            }
            // Here you read the cleartext.
            FileInputStream fis = new FileInputStream(inputPath +"/"+ inputFile);
            // This stream write the encrypted text. This stream will be wrapped by another stream.
            FileOutputStream fos = new FileOutputStream(outputPath +"/"+ inputFile);

            // Length is 16 byte
            SecretKeySpec sks = new SecretKeySpec("MyDifficultPassw".getBytes(), "AES");
            // Create cipher
            Cipher cipher = Cipher.getInstance("AES");
            cipher.init(Cipher.ENCRYPT_MODE, sks);
            // Wrap the output stream
            CipherOutputStream cos = new CipherOutputStream(fos, cipher);
            // Write bytes
            int b;
            byte[] d = new byte[8];
            while ((b = fis.read(d)) != -1) {
                cos.write(d, 0, b);
            }
            // Flush and close streams.
            cos.flush();
            cos.close();
            fis.close();
            Toast.makeText(getApplicationContext(),
                    "file "+inputFile+" encrypted and saved to SD card", Toast.LENGTH_LONG
            ).show();
        }catch (Exception e){
            Toast.makeText(getApplicationContext(),
                    "Something went wrong encrypting", Toast.LENGTH_SHORT
            ).show();
            Log.e("tag", e.getMessage());
        }
    }*/

    function encryptFile(inputPath, inputFile, outputPath) {
        
    }

      //example: list of directories on the root of the device.
      //listDir(cordova.file.externalRootDirectory+"/Movies");
      
      //below works 
      //listDir(cordova.file.applicationDirectory);

      //below works 
      //listDir(cordova.file.applicationStorageDirectory);
      
      //below works 
      //listDir(cordova.file.applicationStorageDirectory+"/files/");

      //did not work cacheDirectory
      //listDir(cordova.file.cacheDirectory);

      //below works 
      //listDir(cordova.file.dataDirectory);
      
      //did not work externalRootDirectory
      //listDir(cordova.file.externalRootDirectory);
      //entries returns  source: file:///android_asset/www/js/controllers/encrypted/EncryptedVideoFileTypesController.js (85)
      
      //below works 
      //listDir(cordova.file.externalApplicationStorageDirectory);
      //entries returns files and cache

      //below works externalCacheDirectory
      //listDir(cordova.file.externalCacheDirectory);
      //entries returns source: file:///android_asset/www/js/controllers/encrypted/EncryptedVideoFileTypesController.js (85)

      //below works externalDataDirectory
      listDir(cordova.file.externalDataDirectory);
      //entries returns ABDSv5

      
      

      //TODO: Allow the user to sellect a Videos from thie Videos folder

      // Once selected the usere must enter thier password to encrypted the selected Videos

      //Save the passwrd as part of the file 
      //Save the pasword to a serve so the user can acces the passwrod on different device

      //Then the encrypted Videos is to be saved to 'ABDSv5/Encrypted/Videos'


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

});//end of EncryptVideoCtrl
