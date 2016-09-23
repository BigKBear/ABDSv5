app.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state){  
    $scope.user = {};
 
    $scope.login = function() {
        LoginService.loginUser($scope.user.username, $scope.user.password).success(function(user) {
             $state.go('tabs.home');
        }).error(function(user) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
});