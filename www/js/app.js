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

  .state('tabs.settings', {
    url: "/settings",
    views: {
      'settings-tab': {
        templateUrl: "templates/settings.html",
        controller: 'SettingsCtrl'
      }
    },
    cache: false
  })

  $urlRouterProvider.otherwise('/login');
});

//Helper function used to Capatilise the first letter in a given string
app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
  });