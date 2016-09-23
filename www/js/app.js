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
    url: "/home/:username",
    templateUrl: "templates/home.html",
    controller: 'HomeTabCtrl'
  })

  .state('encrypt', {
    url: "/encrypt/:username",
    templateUrl: "templates/encrypt.html"
  })

  .state('tabs.decrypt', {
    url: "/decrypt/:username",
    templateUrl: "templates/decrypt.html"
  })

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

  $urlRouterProvider.otherwise('/login');
});

app.controller('HomeTabCtrl', function($scope, $stateParams) {
  $scope.username = $stateParams.username;

  $scope.Encrypt = function(){
  /*  if(username){
    $state.go('tabs.encrypt',{username: username});    
  }*/
  }
  $scope.Decrypt = function(){
   /* if(username){
    $state.go('tabs.decrypt',{username: username});
  }*/
  }
  
});

app.controller('TabEncryptCtrl', function($scope, $state, $stateParams) {
  $scope.username = $stateParams.username;

  $scope.BrowseDecryptedFiles = function(){
    if(username){
    $scope.show ="Encrypt" ; 
  }
  }
  
});

app.controller('TabDecryptCtrl', function($scope, $state,  $stateParams) {
  $scope.username = $stateParams.username;

  $scope.BrowseEncryptedFiles = function(){
    if(username){
    $scope.show ="Decrypt" ;
  }
  }
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