app.controller('LoginCtrl', function($scope, $rootScope, LoginService, $cordovaFile, $timeout, $ionicHistory, $ionicPopup, $state){  
    var username = window.localStorage.getItem("userUsername");
    var encrypted ="";
    var storedkey = window.localStorage.getItem("randomKey");
    var storedIv = window.localStorage.getItem("randomIv");

    if (!username) {
      $scope.messagetouser = "Welcome first time user";
      //Create Key and IV
      var randomKey = randomString(32);
      var randomIv = randomString(32);   

      window.localStorage.setItem("randomKey", randomKey);
      window.localStorage.setItem("randomIv", randomIv);

      storedkey = window.localStorage.getItem("randomKey");
      storedIv = window.localStorage.getItem("randomIv");

      //alert("Key: "+storedkey+"\n \n IV: "+storedIv);

      $rootScope.base64Key = CryptoJS.enc.Base64.parse(storedkey);
      $rootScope.iv = CryptoJS.enc.Base64.parse(storedIv);

      $state.go('register');
    } else if(storedkey == null || !storedIv == null){      
      $state.go('register');
        $scope.messagetouser = "Please use same credentials";
        var randomKey = randomString(32);
        var randomIv = randomString(32);   

        window.localStorage.setItem("randomKey", randomKey);
        window.localStorage.setItem("randomIv", randomIv);
        storedkey = window.localStorage.getItem("randomKey");
      storedIv = window.localStorage.getItem("randomIv");

      //alert("Key: "+storedkey+"\n \n IV: "+storedIv);

      $rootScope.base64Key = CryptoJS.enc.Base64.parse(storedkey);
      $rootScope.iv = CryptoJS.enc.Base64.parse(storedIv);
        
      }else{
        try{
          $scope.titleToShowUser = "Welcome Back " + window.localStorage.getItem("userUsername");
          $rootScope.base64Key = CryptoJS.enc.Base64.parse(window.localStorage.getItem("randomKey"));
          $rootScope.iv = CryptoJS.enc.Base64.parse(window.localStorage.getItem("randomIv"));
        }catch(error){
          alert(error);
        }        
      }
    
    
    var maxattempts = 7;
    var attempts = 0;
    var MAX_PASSWORD_LENGTH=1;

    var userOBJ = {
      username:"",
      password:""
    }

    var reset = function() {
      window.localStorage.removeItem("userUsername");
      window.localStorage.removeItem("EncryptedPassword");

      //Reset folders functionality
      var test_dir = 'ABDSv5/';

      document.addEventListener('deviceready', function () {
        //checks if the ABDSv5 folder exist
        $cordovaFile.checkDir(cordova.file.externalRootDirectory, test_dir)
          .then(function (success) {
              //remove all folders with in the ABDSv5
              $cordovaFile.removeRecursively(cordova.file.externalRootDirectory, test_dir)
                .then(function (success) {
                  // success
                  alert('Directory '+test_dir+' was cleared.');
                }, function (error) {
                  // error
                  alert('Error clearing '+test_dir+' folder.');
                });
          }, function (error) {
            alert('Directory '+ test_dir +' Does not Exist');

            //creates the directory snce it does not exist
            $cordovaFile.createDir(cordova.file.externalRootDirectory, test_dir, true)
              .then( function(success) {
                console.log('Directory was created: OK');
                alert('Directory '+test_dir+' was created.');
              }, function(error){
                alert('Directory '+test_dir+' was not created due to ' + error+'.');
              });
        });
  });
    $state.go('register');
    $scope.messagetouser = "Username and password erased";
  }

    var saveEncryptPassword = function(){
      encrypted = CryptoJS.AES.encrypt(
                userOBJ.password,
                $rootScope.base64Key,
                { iv: $rootScope.iv });
      
      var encryptedpassword = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
      window.localStorage.setItem("EncryptedPassword", encryptedpassword);
    }

    var getEncryptedPassword = function(){
        return window.localStorage.getItem("EncryptedPassword");
    }

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

    var saveUsername = function(){
      window.localStorage.setItem("userUsername", userOBJ.username);
    }

    /* Buttons on view functionality*/
    
    $scope.saveData = function(name,pw,confirmpw){
      //TODO: check if the password is strong using a Password Service

      if(!name || !pw || !confirmpw){
        alert('Please enter all information above to register');
      }else if(pw != confirmpw){
        alert('Passwords do not match');
      }else if(pw != null && pw.length < MAX_PASSWORD_LENGTH){
        alert('Passwords too short');
      }else{        
        alert('Welcome ' +name);

        $timeout(function () {
          userOBJ = {
            username: name,
            password: pw
          };
          saveUsername();
          saveEncryptPassword();
          $state.go('tabs.home');
        },1000);
      }
    }

    $scope.login = function(pw) {
      document.addEventListener('deviceready', DeviceReadyFunction);//end of device ready

      if(!pw){
        var alertPopup = $ionicPopup.alert({
          title: 'Master Password Required!',
          template: 'Please enter your master password'
        });
      }else{
        LoginService.loginUser(pw,getDecryptedPassword()).success(function(userOBJ) {
          
          attempts = 0;
          $state.go('tabs.home');
        }).error(function(userOBJ) {
          attempts++;
          if(attempts==maxattempts){
            reset();
          }else{
            var alertPopup = $ionicPopup.alert({
              title: 'Login failed '+attempts+' times!',
              template: 'Please check your credentials! \n You have '+(maxattempts - attempts)+' left.'
            });
          }
        });      
      }
    }

    $scope.logout = function(){
      $state.go('login');
    }

   $ionicHistory.clearHistory();

   var onFileSystemSuccess = function(fileSystem) {
      console.log('File System name: '+fileSystem.name);
      //alert('File System name: '+fileSystem.name);
      //alert('File System sucess name of file system is: '+ fileSystem.name);
  }

  var onFileSystemError = function(error){
    alert('FileSystemError: ' +evt.target.error.code);
  }

  var DeviceReadyFunction = function () {
        var ROOT_OF_BACKUP_AND_RECOVERY = 'ABDSv5/';
    var BACKUP = ROOT_OF_BACKUP_AND_RECOVERY+'DataBackup/';
    var file_system_path = cordova.file.externalRootDirectory;            //RESULT: folder created in Local storage Device Storage NOT SD Card
    // request the persistent file system a file system in which to store application data.
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFileSystemError);

      $cordovaFile.checkDir(file_system_path, ROOT_OF_BACKUP_AND_RECOVERY)
        .then(function (success) {
          //$scope.rootDirectoryExist += ' '+ ROOT_OF_BACKUP_AND_RECOVERY + ' Exist';
           console.log('success');
        }, function (error) {
          alert(' '+ ROOT_OF_BACKUP_AND_RECOVERY +' Does not Exist');
          $cordovaFile.createDir(file_system_path, ROOT_OF_BACKUP_AND_RECOVERY, true)
            .then( function(success) {
              //$scope.rootDirectoryCreated = 'Directory '+ ROOT_OF_BACKUP_AND_RECOVERY +' was created successfully.';
            }, function(error){
              alert('Directory '+ ROOT_OF_BACKUP_AND_RECOVERY +' was not created due to error code ' + error.code +'.');
          });//end of error creating root of backup
      });//end of error that the directory does not exist

      //Check to see if a BACKUP already exist
      $cordovaFile.checkDir(file_system_path, BACKUP)
        .then(function (success) {
          //if it does exist simply assign directoryExist the string below
          //$scope.directoryExist = 'Directory '+ BACKUP +' Exist';
        }, function (error) {
          //tell the user that the backup already exist
          alert('Directory '+ BACKUP +' Does not Exist it will be created now.');
          $cordovaFile.createDir(file_system_path, BACKUP, true)
            .then( function(success) {
              //$scope.directoryCreated = 'Directory '+ BACKUP +' was created.';
            }, function(error){
              alert('Directory '+ BACKUP +' was not created due to error code ' + error.code +'.');
            });//end of error creating root of backup
        });//end of error that the directory does not exist
  }//end of Device ready function

});