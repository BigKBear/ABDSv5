(function() {

var app = angular.module('abds', ['ionic', 'notes.notestore', 'users.userstore', 'files.filestore']);

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('tabs', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs/tabs.html"
  })
  .state('encrypted_tabs', {
    url: "/encrypted_tab",
    abstract: true,
    templateUrl: "templates/tabs/encrypted_tabs.html"
  })
  .state('decrypted_tabs', {
    url: "/decrypted_tab",
    abstract: true,
    templateUrl: "templates/tabs/decrypted_tabs.html"
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  /*The different home tab bars available*/
  .state('tabs.home', {
    url: "/home",
    views: {
      'home-tab': {
        templateUrl: "templates/home.html",
        controller: 'HomeTabCtrl'
      }
    }
  })
  .state('tabs.device', {
    url: "/device",
    views: {
      'home-tab': {
        templateUrl: "templates/homepage/device.html"
      }
    }
  })
  .state('tabs.about', {
    url: "/about",
    views: {
      'home-tab': {
        templateUrl: "templates/homepage/about.html"
      }
    }
  })
  .state('tabs.about_part2', {
      url: "/about_part2",
      views: {
        'home-tab': {
          templateUrl: "templates/homepage/about_part2.html"
        }
      }
    })
  .state('tabs.tutorial', {
    url: "/tutorial",
    views: {
      'home-tab': {
        templateUrl: "templates/homepage/tutorial.html"
      }
    }
  })
  .state('tabs.settings', {
    url: "/settings",
    views: {
      'home-tab': {
        templateUrl: "templates/homepage/settings.html"
      }
    }
  })
  .state('tabs.contact_us', {
    url: "/contact_us",
    views: {
      'home-tab': {
        templateUrl: "templates/homepage/contact_us.html"
      }
    }
  })


  /*Home tab navigation bar*/
  /*.state('tabs.encrypted', {
    url: "/encrypted",
    views: {
      'encrypted-tab': {
        templateUrl: "templates/videos.html"
      }
    }
  })
  .state('tabs.decrypted', {
    url: "/decrypted",
    views: {
      'decrypted-tab': {
        templateUrl: "templates/videos.html"
      }
    }
  })*/
  .state('tabs.all', {
    url: "/all",
    views: {
      'all-files-tab': {
        templateUrl: "templates/list.html",
        controller: 'ListCtrl'
      }
    }
  })
  /*
 .state('tabs.about', {
    url: "/about",
    views: {
      'about-tab': {
        templateUrl: "templates/homepage/about.html"
      }
    }
  })*/

  /*Encrypted view tabs*/
  .state('encrypted_tabs.home', {
    url: "/home",
    views: {
      'encrypted-home-tab': {
        templateUrl: "templates/home.html"
      }
    }
  })
  .state('encrypted_tabs.videos', {
    url: "/videos",
    views: {
      'encrypted-videos-tab': {
        templateUrl: "templates/videos.html"
      }
    }
  })
  .state('encrypted_tabs.pictures', {
    url: "/pictures",
    views: {
      'encrypted-pictures-tab': {
        templateUrl: "templates/pictures.html"
      }
    }
  })
  .state('encrypted_tabs.music', {
    url: "/music",
    views: {
      'encrypted-music-tab': {
        templateUrl: "templates/music.html"
      }
    }
  })
  .state('encrypted_tabs.document', {
    url: "/documents",
    views: {
      'encrypted-document-tab': {
        templateUrl: "templates/documents.html"
      }
    }
  })
  .state('encrypted_tabs.other', {
    url: "/other",
    views: {
      'encrypted-other-tab': {
        templateUrl: "templates/other.html"
      }
    }
  })

  /*Decrypted view tabs*/
  .state('decrypted_tabs.home', {
    url: "/home",
    views: {
      'decrypted-home-tab': {
        templateUrl: "templates/home.html",
        controller: 'HomeTabCtrl'
      }
    }
  })
  .state('decrypted_tabs.videos', {
    url: "/videos",
    views: {
      'decrypted-videos-tab': {
        templateUrl: "templates/videos.html"
      }
    }
  })
  .state('decrypted_tabs.pictures', {
    url: "/pictures",
    views: {
      'decrypted-pictures-tab': {
        templateUrl: "templates/pictures.html"
      }
    }
  })
  .state('decrypted_tabs.music', {
    url: "/music",
    views: {
      'decrypted-music-tab': {
        templateUrl: "templates/music.html"
      }
    }
  })
  .state('decrypted_tabs.document', {
    url: "/documents",
    views: {
      'decrypted-document-tab': {
        templateUrl: "templates/documents.html"
      }
    }
  })
  .state('decrypted_tabs.other', {
    url: "/other",
    views: {
      'decrypted-other-tab': {
        templateUrl: "templates/other.html"
      }
    }
  })

  /*Other states from notes app*/
  .state('list', {
    url: '/list',
    templateUrl: 'templates/list.html',
    controller: 'ListCtrl'
  })

  .state('add', {
    url: '/add',
    templateUrl: 'templates/edit.html',
    controller: 'AddCtrl'
  })

  .state('edit', {
    url: '/edit/:noteId',
    templateUrl: 'templates/edit.html',
    controller: 'EditCtrl'
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
     /*User.login($scope.user)
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
        $state.go('tabs.home');
        //$state.go('encrypted_tabs.home');
        //$state.go('decrypted_tabs.home');
      }
  };
});

app.controller('HomeTabCtrl', function($scope) {
  console.log('HomeTabCtrl');
});

app.controller('ListCtrl', function($scope, $ionicPlatform, NoteStore, FileFactory){  
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

  var fs = new FileFactory();

  $ionicPlatform.ready(function() {  
       /* 
       fs.getEntriesAtRoot();
       .then(function(result) {
            $scope.files = result;
        }, function(error) {
            console.error(error);
        });

        $scope.getContents = function(path) {
            fs.getEntries(path).then(function(result) {
                $scope.files = result;
                $scope.files.unshift({name: "[parent]"});
                fs.getParentDirectory(path).then(function(result) {
                    result.name = "[parent]";
                    $scope.files[0] = result;
                });
            });
        }
*/
    });
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