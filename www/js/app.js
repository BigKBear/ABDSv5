var app = angular.module('abds', ['ionic','angularjs-crypto', 'base64', 'ngCordova','login.service', 'cipher.factory']);

app.run(
function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  })
});

var randomString = function(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

app.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('top'); // other values: top

  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl',
    cache: false
  })

  .state('register', {
    url: '/register',
    templateUrl: 'templates/registration.html',
    controller: 'LoginCtrl',
    cache: false
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
    },
    cache: false
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
        templateUrl: "templates/homepage/tutorial.html",
        controller:'HomeTabCtrl'
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
  .state('tabs.all', {
    url: "/all",
    views: {
      'all-files-tab': {
        templateUrl: "templates/all.html",
        controller: 'AllFilesCtrl'
      }
    }
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
        templateUrl: "templates/encrypted/videos.html",
        controller: 'EncryptedVideoCtrl'
      }
    }
  })
  .state('encrypted_tabs.pictures', {
    url: "/pictures",
    views: {
      'encrypted-pictures-tab': {
        templateUrl: "templates/encrypted/pictures.html",
        controller: 'EncryptedPictureCtrl'
      }
    }
  })
  .state('encrypted_tabs.music', {
    url: "/music",
    views: {
      'encrypted-music-tab': {
        templateUrl: "templates/encrypted/music.html",
        controller: 'EncryptedMusicCtrl'
      }
    }
  })
  .state('encrypted_tabs.document', {
    url: "/documents",
    views: {
      'encrypted-document-tab': {
        templateUrl: "templates/encrypted/documents.html",
        controller: 'EncryptedDocumentCtrl'
      }
    }
  })
  .state('encrypted_tabs.other', {
    url: "/other",
    views: {
      'encrypted-other-tab': {
        templateUrl: "templates/encrypted/other.html",
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
        templateUrl: "templates/decrypted/videos.html",
        controller: "DecryptedVideoCtrl"
      }
    }
  })
  .state('decrypted_tabs.pictures', {
    url: "/pictures",
    views: {
      'decrypted-pictures-tab': {
        templateUrl: "templates/decrypted/pictures.html",
        controller: "DecryptedPictureCtrl"
      }
    }
  })
  .state('decrypted_tabs.music', {
    url: "/music",
    views: {
      'decrypted-music-tab': {
        templateUrl: "templates/decrypted/music.html",
        controller: "DecryptedMusicCtrl"
      }
    }
  })
  .state('decrypted_tabs.document', {
    url: "/documents",
    views: {
      'decrypted-document-tab': {
        templateUrl: "templates/decrypted/documents.html",
        controller: 'DecryptedDocumentCtrl'
      }
    }
  })
  .state('decrypted_tabs.other', {
    url: "/other",
    views: {
      'decrypted-other-tab': {
        templateUrl: "templates/decrypted/other.html",
        controller: "DecryptedOtherCtrl"
      }
    }
  })

  $urlRouterProvider.otherwise('/login');
});

app.controller('HomeTabCtrl', function($scope,$ionicHistory) {
   $scope.VIDEO = function() {
            if (navigator.camera) {
              navigator.camera.getPicture( cameraSuccess2, cameraError,
              { sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
               mediaType:navigator.camera.MediaType.VIDEO,
                                         } );
            } else {
              $scope.image.src = "http://lorempixel.com/200/400/";
              console.log('default image was set');
            }
                                }
      function cameraSuccess2(VideoURI) {
                $scope.video = document.getElementById('myVideo');
                // hack until cordova 3.5.0 is released
                if (VideoURI.substring(0,21)=="content://com.android") {
                        var photo_split=VideoURI.split("%3A");
                        VideoURI="content://media/external/video/media/"+photo_split[1];
                                                                       }
                $scope.VideoURI =  VideoURI;
                $scope.video.src = $scope.VideoURI;
                $scope.apply();
           }
  console.log('HomeTabCtrl');
  //$ionicHistory.clearHistory();
});

//Helper function used to Capatilise the first letter in a given string
app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
  });