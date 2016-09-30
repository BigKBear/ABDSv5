var app = angular.module('abds', ['ionic', 'ngCordova','login.service']);

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

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
        templateUrl: "templates/homepage/device.html",
        controller: 'DeviceCtrl'
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
        templateUrl: "templates/all.html",
        controller: 'AllFilesCtrl'
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
        templateUrl: "templates/home.html",
        controller: 'HomeTabCtrl'
      }
    }
  })
  .state('encrypted_tabs.videos', {
    url: "/videos",
    views: {
      'encrypted-videos-tab': {
        templateUrl: "templates/videos.html",
        controller: 'EncryptedVideoCtrl'
      }
    }
  })
  .state('encrypted_tabs.pictures', {
    url: "/pictures",
    views: {
      'encrypted-pictures-tab': {
        templateUrl: "templates/pictures.html",
        controller: 'EncryptedPictureCtrl'
      }
    }
  })
  .state('encrypted_tabs.music', {
    url: "/music",
    views: {
      'encrypted-music-tab': {
        templateUrl: "templates/music.html",
        controller: 'EncryptedMusicCtrl'
      }
    }
  })
  .state('encrypted_tabs.document', {
    url: "/documents",
    views: {
      'encrypted-document-tab': {
        templateUrl: "templates/documents.html",
        controller: 'EncryptedDocumentCtrl'
      }
    }
  })
  .state('encrypted_tabs.other', {
    url: "/other",
    views: {
      'encrypted-other-tab': {
        templateUrl: "templates/other.html",
        controller: 'EncryptedOtherCtrl'
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
        templateUrl: "templates/videos.html",
        controller: "DecryptedVideoCtrl"
      }
    }
  })
  .state('decrypted_tabs.pictures', {
    url: "/pictures",
    views: {
      'decrypted-pictures-tab': {
        templateUrl: "templates/pictures.html",
        controller: "DecryptedPictureCtrl"
      }
    }
  })
  .state('decrypted_tabs.music', {
    url: "/music",
    views: {
      'decrypted-music-tab': {
        templateUrl: "templates/music.html",
        controller: "DecryptedMusicCtrl"
      }
    }
  })
  .state('decrypted_tabs.document', {
    url: "/documents",
    views: {
      'decrypted-document-tab': {
        templateUrl: "templates/documents.html",
        controller: 'DecryptedDocumentCtrl'
      }
    }
  })
  .state('decrypted_tabs.other', {
    url: "/other",
    views: {
      'decrypted-other-tab': {
        templateUrl: "templates/other.html",
        controller: "DecryptedOtherCtrl"
      }
    }
  })

  /*Other states from notes app*/
  /*.state('list', {
    url: '/list',
    templateUrl: 'templates/list.html',
    controller: 'ListCtrl'
  })*/

  /*.state('add', {
    url: '/add',
    templateUrl: 'templates/edit.html',
    controller: 'AddCtrl'
  })

  .state('edit', {
    url: '/edit/:noteId',
    templateUrl: 'templates/edit.html',
    controller: 'EditCtrl'
  });*/

  $urlRouterProvider.otherwise('/login');
});

app.controller('HomeTabCtrl', function($scope) {
  console.log('HomeTabCtrl');
  //$state.go('tabs.home');
});

/*app.controller('DeviceCtrl', function($scope){
  document.addEventListener('deviceready', function() {
    console.log('device is ' + angular.toJson(device));
    //modify the scope to update the digest loop and the view will be updated
    $scope.$apply(function() {
      $scope.device = device;
    });
  });
});*/

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