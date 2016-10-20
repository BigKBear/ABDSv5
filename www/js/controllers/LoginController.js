app.controller('LoginCtrl', function($scope, $rootScope, LoginService, $timeout,$cipherFactory, $ionicHistory, $ionicPopup, $state){  

    //Check to see if it is the first time the user is using the application
    var username = window.localStorage.getItem("userUsername");
    var encrypted ="";

    if (!username) {
      $scope.messagetouser = "Welcome first time user";
      $state.go('register');
    } else {
      $scope.messagetouser = "Welcome Back " + window.localStorage.getItem("userUsername");
    }
    
    //configuration for max atempts
    var maxattempts = 1;
    var attempts = 0;

    var userOBJ = {
      username:"",
      password:""
    };

    //utility functions
    //Function used to reset user data
    var reset = function() {
        window.localStorage.removeItem("userUsername");
        window.localStorage.removeItem("EncryptedPassword");
        $state.go('register');
        $scope.messagetouser = "Username and password erased";
    }

    //Function to load the current user password
    var saveEncryptPassword = function(){
      encrypted = CryptoJS.AES.encrypt(
                userOBJ.password,
                $rootScope.base64Key,
                { iv: $rootScope.iv });
      //alert('String being saved '+ encrypted.ciphertext.toString(CryptoJS.enc.Base64));
      var encryptedpassword = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
      window.localStorage.setItem("EncryptedPassword", encryptedpassword);
    }

    var getEncryptedPassword = function(){
        //alert('Getting encrypted password \n'+window.localStorage.getItem("EncryptedPassword"));
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
        //alert('Getting decrypted password \n'+ decrypted.toString(CryptoJS.enc.Utf8));
        return decrypted.toString(CryptoJS.enc.Utf8);
    }

    //function to load the curent user username
    var saveUsername = function(){
      window.localStorage.setItem("userUsername", userOBJ.username);
    }

    

    /* Buttons on view functionality*/
    //save the user credentials
    $scope.saveData = function(name,pw,confirmpw){
      //TODO: check if the password is strong using a Password Service

      //check that the form has been filled out
      if(!name || !pw || !confirmpw){
        alert('Please enter all information above to register');
      }else if(pw != confirmpw){
        alert('Passwords do not match');
      }else{
        //initialise and empty user object
        alert('Welcome ' +name);

        //Simulate API call
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
          /*alert('encrypted='+getEncryptedPassword());
          alert('decrypted='+getDecryptedPassword());*/
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
      //$ionicHistory.clearHistory();
    }

    $scope.logout = function(){
      $state.go('login');
      //$ionicHistory.clearHistory();
    }

    /*No used but might be needed*/
    $scope.isLoggedIn = function() {
      if(window.localStorage.getItem("username") !== undefined && window.localStorage.getItem("password") !== undefined) {
          return true;
      } else {
          return false;
      }
    }

    var loadUsername = function(){
      $timeout(function () {
        return window.localStorage.getItem("userUsername");
       },1000);
    }


    $ionicHistory.clearHistory();
});