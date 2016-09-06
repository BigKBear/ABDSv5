(function() {

var app = angular.module('abds', ['ionic', 'ngCordova', 'notes.notestore', 'users.userstore', 'files.filestore']);

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
        templateUrl: "templates/videos.html",
        controller: 'EncryptVideoCtrl'
      }
    }
  })
  .state('encrypted_tabs.pictures', {
    url: "/pictures",
    views: {
      'encrypted-pictures-tab': {
        templateUrl: "templates/pictures.html",
        controller: 'EncryptPivtureCtrl'
      }
    }
  })
  .state('encrypted_tabs.music', {
    url: "/music",
    views: {
      'encrypted-music-tab': {
        templateUrl: "templates/music.html",
        controller: 'EncryptMusicCtrl'
      }
    }
  })
  .state('encrypted_tabs.document', {
    url: "/documents",
    views: {
      'encrypted-document-tab': {
        templateUrl: "templates/documents.html",
        controller: 'EncryptDocumentCtrl'
      }
    }
  })
  .state('encrypted_tabs.other', {
    url: "/other",
    views: {
      'encrypted-other-tab': {
        templateUrl: "templates/other.html",
        controller: 'EncryptOtherCtrl'
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



app.controller('EncryptVideoCtrl',function($scope, $state,$ionicPlatform, $cordovaFile) {
  var currentPlatform = ionic.Platform.platform();  
          $scope.currentPlatform = currentPlatform;

$ionicPlatform.ready(function() {
  if (ionic.Platform.isAndroid()) {

    //var test_dir = 'DCMI/ABDSv5';
    var test_dir = 'ABDSv5';
    $cordovaFile.checkDir(cordova.file.externalDataDirectory, test_dir)
      .then(function (success) {
        // success
        $scope.stepone = 'Directory '+ test_dir +' Exist';
      }, function (error) {
        // error
        $scope.stepone = 'Directory '+ test_dir +' Does not Exist';
      });

       // Create dir 'DCMI/ABDSv5'
      $cordovaFile.createDir(cordova.file.externalDataDirectory, 'ABDSv5', false)
       .then( function(success) {
        console.log('Directory was created: OK');
        $scope.filedirectory = 'Directory '+test_dir+' was created.';
      }, function(error){
        $scope.filedirectory ='Directory '+test_dir+' was not created due to ' + error+'.';
      });

        $cordovaFile.checkDir(cordova.file.externalDataDirectory, test_dir)
      .then(function (success) {
        // success
        $scope.stepthree = 'Directory '+ test_dir +' Exist';
      }, function (error) {
        // error
        $scope.stepthree = 'Directory '+ test_dir +' Does not Exist';
      });
    
      // If running on Android
      console.log('cordova.file.externalDataDirectory: ' + cordova.file.externalDataDirectory);
      //
      // I use cordova.file.externalDataDirectory because this url is for Android devices
      // If you remove the app from the device these url are cleared too on the device. So keep it clean.
      // Remove the root from cordova.file.externalDataDirectory
      // 
            myFsRootDirectory1 = 'file:///storage/emulated/0/'; // path for tablet
            myFsRootDirectory2 = 'file:///storage/sdcard0/'; // path for phone
            fileTransferDir = cordova.file.externalDataDirectory;
            if (fileTransferDir.indexOf(myFsRootDirectory1) === 0) {
              fileDir = fileTransferDir.replace(myFsRootDirectory1, '');
            }
            if (fileTransferDir.indexOf(myFsRootDirectory2) === 0) {
              fileDir = fileTransferDir.replace(myFsRootDirectory2, '');
            }
      console.log('Android FILETRANSFERDIR: ' + fileTransferDir);
      console.log('Android FILEDIR: ' + fileDir);
    }

    if (ionic.Platform.isIOS()) {
// if running on IOS
console.log('cordova.file.documentsDirectory: ' + cordova.file.documentsDirectory);
// I use cordova.file.documentsDirectory because this url is for IOS (NOT backed on iCloud) devices
      fileTransferDir = cordova.file.documentsDirectory;
      fileDir = '';
console.log('IOS FILETRANSFERDIR: ' + fileTransferDir);
console.log('IOS FILEDIR: ' + fileDir);


    }

  if (ionic.Platform.isAndroid() || ionic.Platform.isIOS()) {
    // Create dir test
    /*  $cordovaFile.createDir(cordova.file.externalDataDirectory,'testvid',false)
       .then( function(success) {
        console.log('Directory was created: OK');
        $scope.filedirectory = 'Directory was created: OK';
      }, function(error){
        $scope.filedirectory ='Directory was not created: OK';
      });*/
  }
});


/*document.addEventListener('deviceready', onDeviceReady, false);  
function onDeviceReady() {  
 $cordovaFile.getFreeDiskSpace()
            .then(function (success) {
             // success in kilobytes
             $scope.freeSpace = success;
            }, function (error) {
              // error
              $scope.freeSpace = 'did not get free space...';
            });


 console.log( $cordovaFile.checkFile('file:///android_asset/', "example.json"));
}*/
 /* document.addEventListener('deviceready', onDeviceReady, false);  
function onDeviceReady() {  
    function writeToFile(fileName, data) {
        data = JSON.stringify(data, null, '\t');
        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (directoryEntry) {
            directoryEntry.getFile(fileName, { create: true }, function (fileEntry) {
                fileEntry.createWriter(function (fileWriter) {
                    fileWriter.onwriteend = function (e) {
                        // for real-world usage, you might consider passing a success callback
                        console.log('Write of file "' + fileName + '"" completed.');
                    };

                    fileWriter.onerror = function (e) {
                        // you could hook this up with our global error handler, or pass in an error callback
                        console.log('Write failed: ' + e.toString());
                    };

                    var blob = new Blob([data], { type: 'text/plain' });
                    fileWriter.write(blob);
                }, errorHandler.bind(null, fileName));
            }, errorHandler.bind(null, fileName));
        }, errorHandler.bind(null, fileName));
    }

    writeToFile('example.json', { foo: 'bar' });
}*/

  /*1) create ABDS encrepted directory if one does not already exist on the SD_Card or phone internal memory*/
/*    function onInitFs(fs) {  
    console.log('Opened file system: ' + fs.name);
}
 /*50MB

window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;  
window.requestFileSystem(window.PERSISTENT, 50*1024*1024, onInitFs, function(errorHandler){
        console.error(error);
      });  

window.webkitStorageInfo.requestQuota(PERSISTENT, 1024*1024, function (grantedBytes) {  
    window.requestFileSystem(window.PERSISTENT, grantedBytes, onInitFs, function(errorHandler){
        console.error(error);
      });
}, function (e) {
    console.log('Error', e);
});
*/
  /*2) open the subdirectory encrypted videos*/

  /*3) Show the list of all currently existing encrypted videos*/

  /*4) Setup listeners to if a video is selected and show decryption button*/

});

app.controller('EncryptPivtureCtrl',function() {
  /*1) create ABDS encrepted directory if one does not already exist on the SD_Card or phone internal memory*/

  /*2) open the subdirectory encrypted pictures*/

  /*3) Show the list of all currently existing encrypted pictures*/

  /*4) Setup listeners to if a picture is selected and show decryption button*/

});

app.controller('EncryptMusicCtrl',function() {

});

app.controller('EncryptDocumentCtrl',function() {

});

app.controller('EncryptOtherCtrl',function() {

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