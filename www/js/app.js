(function() {

var app = angular.module('abds', ['ionic', 'notes.notestore', 'users.userstore']);

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('list', {
    url: '/list',
    templateUrl: 'templates/list.html',
    controller: 'ListCtrl'
  });

  $stateProvider.state('add', {
    url: '/add',
    templateUrl: 'templates/edit.html',
    controller: 'AddCtrl'
  });

  $stateProvider.state('edit', {
    url: '/edit/:noteId',
    templateUrl: 'templates/edit.html',
    controller: 'EditCtrl'
  });

  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  });

  $urlRouterProvider.otherwise('/login');
});

app.controller('LoginCtrl', function($scope, $state, UserStore){  
  $scope.users = UserStore.list();

  $scope.user = {
    id: new Date().getTime().toString(),
    username: '',
    password: ''
  };
  
  $scope.loginFailed = false;

  $scope.login = function() {
     /*User.login($scope.credentials)
      .then(function() {
        $ionicHistory.nextViewOptions({historyRoot: true});
        $state.go('list');
      })
      .catch(function() {
        $scope.loginFailed = true;
      });*/
      if(($scope.user.password == '')||($scope.user.username == '')){
        $scope.loginFailed = true;
      }else{
        UserStore.createUser($scope.user);
        $state.go('list');
      }
  };
});

app.controller('ListCtrl', function($scope, NoteStore){  
  $scope.notes = NoteStore.list();
  $scope.reordering =false;

  $scope.remove = function(noteId){
    NoteStore.remove(noteId);
  };

  $scope.move = function(note, fromIndex, toIndex){
    
    NoteStore.move(note, fromIndex, toIndex);
  };

  $scope.toggleReordering = function(){
    $scope.reordering = !$scope.reordering;
  };

});

app.controller('AddCtrl', function($scope, $state, NoteStore) {

  $scope.note = {
    id: new Date().getTime().toString(),
    title: '',
    description: ''
  };

  $scope.save = function() {
    NoteStore.createNote($scope.note);
    $state.go('list');
  };
});

app.controller('EditCtrl', function($scope, $state, NoteStore){
  
  $scope.note = angular.copy(NoteStore.getNote($state.params.noteId));
  
  $scope.save = function() {
    NoteStore.updateNote($scope.note);
    $state.go('list');
  };
});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

}());