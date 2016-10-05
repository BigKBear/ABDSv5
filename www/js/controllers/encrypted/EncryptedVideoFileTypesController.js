app.controller('EncryptedVideoCtrl',function($scope, $state, $ionicPlatform, $cordovaFile) {
  document.addEventListener('deviceready', function () {
    $scope.messageToUser = "Below are the encrypted Videos/Movies you have saved on the SDCard:";



    $cordovaFile.getFreeDiskSpace()
      .then(function (success) {
         // success in kilobytes
         $scope.messageToUser = success +' kilobytes';
      }, function (error) {
          // error
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
    
      var currentPlatform = ionic.Platform.platform();  
  $scope.currentPlatform = currentPlatform;

  $ionicPlatform.ready(function() {

    if (ionic.Platform.isAndroid()) {
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

      //below works 
      //listDir(cordova.file.dataDirectory);
      
      


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
