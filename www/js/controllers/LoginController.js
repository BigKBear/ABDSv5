app.controller('LoginCtrl', function(cfCryptoHttpInterceptor, $rootScope, $scope, LoginService, $cordovaFile, $timeout, $ionicHistory, $ionicPopup, $state){  
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

    } else {
      $scope.messagetouser = "Welcome Back " + window.localStorage.getItem("userUsername");
      $rootScope.base64Key = CryptoJS.enc.Base64.parse(window.localStorage.getItem("randomKey"));
      $rootScope.iv = CryptoJS.enc.Base64.parse(window.localStorage.getItem("randomIv"));
    }
    
    var maxattempts = 7;
    var attempts = 0;
    var MAX_PASSWORD_LENGTH=1;

    var userOBJ = {
      username:"",
      password:""
    };

    var reset = function() {
        window.localStorage.removeItem("userUsername");
        window.localStorage.removeItem("EncryptedPassword");

        //Reset folders functionality
    var test_dir = 'ABDSv5/';
    var test_dir1 = 'ABDSv5/Encrypted';
    var SD_CARD_DECRYPTED_DIR = 'ABDSv5/Decrypted';
   
    document.addEventListener('deviceready', function () {
      $cordovaFile.checkDir(cordova.file.externalRootDirectory, test_dir)
        .then(function (success) {
          
          $cordovaFile.removeRecursively(cordova.file.externalRootDirectory, test_dir1)
          .then(function (success) {
        // success
        alert('Directory '+test_dir1+' was cleared.');
      }, function (error) {
        // error
        alert('Error clearing '+test_dir1+' folder.');
      });

          $cordovaFile.removeRecursively(cordova.file.externalRootDirectory, SD_CARD_DECRYPTED_DIR)
          .then(function (success) {
        // success
        alert('Directory '+SD_CARD_DECRYPTED_DIR+' was cleared.');
      }, function (error) {
        // error
        alert('Error clearing '+SD_CARD_DECRYPTED_DIR+' folder.');
      });
        }, function (error) {
          
          alert('Directory '+ test_dir +' Does not Exist');
          
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
      }else if(pw.length<MAX_PASSWORD_LENGTH){
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
          $state.go('login');
        },1000);
      }
    }

    $scope.login = function(pw) {
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
});