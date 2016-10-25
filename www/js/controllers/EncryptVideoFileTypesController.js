app.controller('EncryptVideoCtrl',function($scope, $state,$ionicPlatform, $cordovaFile) {
  var currentPlatform = ionic.Platform.platform();  
          $scope.currentPlatform = currentPlatform;

$ionicPlatform.ready(function() {
  if (ionic.Platform.isAndroid()) {
    var test_dir = 'ABDSv5/';
    var test_dir1 = 'ABDSv5/Encrypted';
    var test_dir2 = 'ABDSv5/Encrypted/Videos';

    $cordovaFile.checkDir(cordova.file.externalRootDirectory, test_dir)
      .then(function (success) {
        // success
        $scope.stepone = 'Directory '+ test_dir +' Exist';
      }, function (error) {
        // error
        $scope.stepone = 'Directory '+ test_dir +' Does not Exist';
        // Create dir 'ABDSv5'
         $cordovaFile.createDir(cordova.file.externalRootDirectory, test_dir, true)
         .then( function(success) {
          console.log('Directory was created: OK');
          $scope.stepone = 'Directory '+test_dir+' was created.';
        }, function(error){
          $scope.stepone ='Directory '+test_dir+' was not created due to ' + error+'.';
        });
      });

    $cordovaFile.checkDir(cordova.file.externalRootDirectory, test_dir1)
      .then(function (success) {
        // success
        $scope.steptwo = 'Directory '+ test_dir1 +' Exist';
      }, function (error) {
        // error
        $scope.steptwo = 'Directory '+ test_dir1 +' Does not Exist';
        // Create dir 'ABDSv5/Encrypted'
        $cordovaFile.createDir(cordova.file.externalRootDirectory, test_dir1, true)
         .then( function(success) {
          console.log('Directory was created: OK');
          $scope.steptwo = 'Directory '+test_dir1+' was created.';
        }, function(error){
          $scope.steptwo ='Directory '+test_dir1+' was not created due to ' + error+'.';
        });
      });

    $cordovaFile.checkDir(cordova.file.externalRootDirectory, test_dir2)
      .then(function (success) {
        // success
        $scope.stepthree = 'Directory '+ test_dir2 +' Exist';
      }, function (error) {
        // error
        $scope.stepone = 'Directory '+ test_dir2 +' Does not Exist';
        // Create dir 'ABDSv5/Encrypted/Videos'
         $cordovaFile.createDir(cordova.file.externalRootDirectory, test_dir2, true)
         .then( function(success) {
          console.log('Directory was created: OK');
          $scope.stepthree = 'Directory '+test_dir2+' was created.';
        }, function(error){
          $scope.stepthree ='Directory '+test_dir2+' was not created due to ' + error+'.';
        });
      });

    function listDir(path){
        window.resolveLocalFileSystemURL(path,
          function (fileSystem) {
            var reader = fileSystem.createReader();
            reader.readEntries(
              function (entries) {
                //console.log('ENTRIES'+ entries);
                var videodirectories = entries;
                $scope.videodirectories = videodirectories;
                window.localStorage.setItem('newsArticle12', localData);
                /*var localData = JSON.parse(window.localStorage.getItem('newsArticle12');
                  $.each(function(key, value){
                    //handle the data
                  });*/
            },
            function (err) {
              console.log(err);
            }
          );
        }, function (err) {
          console.log(err);
        }
      );
    }
    //example: list of www/audio/ folder in cordova/ionic app.
    listDir(cordova.file.externalRootDirectory);
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
    /*  $cordovaFile.createDir(cordova.file.externalRootDirectory,'testvid',false)
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