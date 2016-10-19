app.controller('LoginCtrl', function($scope, LoginService,$timeout,$cipherFactory, $ionicHistory, $ionicPopup, $state){  

    //TODO: Store the password in a server
    var firstRun = window.localStorage.getItem("firstRun");
    
    var userOBJ = {};
    
    if(firstRun === null || firstRun === undefined|| firstRun === ""){
      $scope.messagetouser = "Welcome first time user register below";
      $state.go('register');
    }else{
          $scope.messagetouser = "Welcome Back " + window.localStorage.getItem("userUsername");
          $state.go('login');
        }

    $scope.saveData = function(){
      //initialise and empty user object
      
          //Simulate API call
          $timeout(function () {
            userOBJ = {
              username: $scope.user.username,
              password: $scope.user.password
            };

            window.localStorage.setItem("userUsername", userOBJ.username);
            window.localStorage.setItem("userPassword", userOBJ.password);
            firstRun = window.localStorage.setItem("firstRun", false);
          },1000);
          $state.go('login');
      }
      

      $scope.loadPassword = function(){
        $timeout(function () {
           return window.localStorage.getItem("userPassword");
         },1000);
      }

      $scope.loadUsername = function(){
        $timeout(function () {
           return window.localStorage.getItem("userUsername");
         },1000);
      }

    $scope.user = {};
 
    $scope.login = function() {
          //$scope.messagetouser = "Welcome Back " + window.localStorage.getItem("userUsername");
          LoginService.loginUser($scope.user.username, $scope.user.password).success(function(user) {
               $state.go('tabs.home');
          }).error(function(user) {
              var alertPopup = $ionicPopup.alert({
                  title: 'Login failed!',
                  template: 'Please check your credentials!'
              });
          });         
    }

     $scope.isLoggedIn = function() {
        if(window.localStorage.getItem("username") !== undefined && window.localStorage.getItem("password") !== undefined) {
            return true;
        } else {
            return false;
        }
    };

    $scope.logout = function() {
        window.localStorage.removeItem("userUsername");
        window.localStorage.removeItem("userPassword");
    };
    $ionicHistory.clearHistory();
});