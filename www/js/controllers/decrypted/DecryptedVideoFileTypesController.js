app.controller('DecryptedVideoCtrl',function($scope, $ionicPopup, $state, $ionicPlatform, $cordovaFile, $ionicHistory) {
  document.addEventListener('deviceready', function () {
    $scope.messageToUser = "Below are the files and folders currently saved on the device in the Videos folder:";
    $scope.encryptDecrypt = "Encrypt";
    $scope.fileLabel = "Choose a file to encrypt:";

    var test_dir = 'ABDSv5/';
    var test_dir1 = 'ABDSv5/Decrypted';
    var test_dir2 = 'ABDSv5/Decrypted/Videos';

    $cordovaFile.checkDir(cordova.file.externalRootDirectory, test_dir)
      .then(function (success) {
        $scope.stepone = 'Directory '+ test_dir +' Exist';
      }, function (error) {
        $scope.stepone = 'Directory '+ test_dir +' Does not Exist';

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
          
          $scope.steptwo = 'Directory '+ test_dir1 +' Exist';
        }, function (error) {
          
          $scope.steptwo = 'Directory '+ test_dir1 +' Does not Exist';
          
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
          
          $scope.stepthree = 'Directory '+ test_dir2 +' Exist';
        }, function (error) {
          
          $scope.stepone = 'Directory '+ test_dir2 +' Does not Exist';
          
           $cordovaFile.createDir(cordova.file.externalRootDirectory, test_dir2, true)
           .then( function(success) {
            console.log('Directory was created: OK');
            $scope.stepthree = 'Directory '+test_dir2+' was created.';
          }, function(error){
            $scope.stepthree ='Directory '+test_dir2+' was not created due to ' + error+'.';
          });
        });     
        
          var currentPlatform = ionic.Platform.platform();  
    $scope.currentPlatform = currentPlatform;

    $ionicPlatform.ready(function() {
      if (ionic.Platform.isAndroid()) {
        function listDir(path){
          window.resolveLocalFileSystemURL(path,
            function (fileSystem) {
              var reader = fileSystem.createReader();
              reader.readEntries(
                function (entries) {
                  var videodirectories = entries;
                  $scope.videodirectories = entries;
          
              },
              function (err) {
                console.log(err);
              }
            );
          }, function (err) {
            console.log(err);
          });
        }
        
        listDir(cordova.file.externalRootDirectory+"Movies");
        /*if(!listDir(cordova.file.externalRootDirectory+test_dir2)){
          
          $scope.notification = "no files in "+ test_dir2;
        }else{
          listDir(cordova.file.externalRootDirectory+test_dir2);
          listDir(cordova.file.externalRootDirectory);
          $scope.notification = "";
        }*/

        // A confirm dialog before deleting file
       $scope.Delete = function(file) {
         var confirmPopup = $ionicPopup.confirm({
           title: 'Delete '+ file.name+'?',
           template: 'Are you sure you want to delete' + file.name+ '?'
         });

         confirmPopup.then(function(res) {
           if(res) {
             $cordovaFile.removeFile(cordova.file.externalRootDirectory+test_dir2, file.name)
              .then(function (success) {
                // success
                alert("file was deleted");
                $state.go('encrypted_tabs.home');
              }, function (error) {
              // error
              alert("file was not deleted");
              $state.go('encrypted_tabs.home');
            });
           } else {
             alert("file "+file.name+" was not deleted");
           }
         });
       };

    var getDecryptedPassword = function(){
      var cipherParams = CryptoJS.lib.CipherParams.create({
                ciphertext: CryptoJS.enc.Base64.parse(window.localStorage.getItem("EncryptedPassword"))
                });

      var decrypted = CryptoJS.AES.decrypt(
                  cipherParams,
                  $rootScope.base64Key,
                  { iv: $rootScope.iv });
                  $scope.descrString = decrypted.toString(CryptoJS.enc.Utf8);
        
        return decrypted.toString(CryptoJS.enc.Utf8);
    }

    $scope.encrypt = function(file){
      // Create Base64 Object
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
encode:function(e){
  var t="";
  var n,r,i,s,o,u,a;
  var f=0;e=Base64._utf8_encode(e);
  while(f<e.length){
    n=e.charCodeAt(f++);
    r=e.charCodeAt(f++);
    i=e.charCodeAt(f++);
    s=n>>2;
    o=(n&3)<<4|r>>4;
    u=(r&15)<<2|i>>6;
    a=i&63;
    if(isNaN(r)){
      u=a=64
    }else if(isNaN(i)){
      a=64
    }
    t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)
  }return t
},
decode:function(e){
  var t="";
  var n,r,i;
  var s,o,u,a;
  var f=0;
  e=e.replace(/[^A-Za-z0-9+/=]/g,"");
  while(f<e.length){
    s=this._keyStr.indexOf(e.charAt(f++));
    o=this._keyStr.indexOf(e.charAt(f++));
    u=this._keyStr.indexOf(e.charAt(f++));
    a=this._keyStr.indexOf(e.charAt(f++));
    n=s<<2|o>>4;r=(o&15)<<4|u>>2;
    i=(u&3)<<6|a;
    t=t+String.fromCharCode(n);
    if(u!=64){
      t=t+String.fromCharCode(r)
    }if(a!=64){
      t=t+String.fromCharCode(i)
    }
  }
  t=Base64._utf8_decode(t);
  return t
},
_utf8_encode:function(e){
  e=e.replace(/rn/g,"n");
  var t="";
  for(var n=0;n<e.length;n++){
    var r=e.charCodeAt(n);
    if(r<128){
      t+=String.fromCharCode(r)
    }else if(r>127&&r<2048){
      t+=String.fromCharCode(r>>6|192);
      t+=String.fromCharCode(r&63|128)
    }else{
      t+=String.fromCharCode(r>>12|224);
      t+=String.fromCharCode(r>>6&63|128);
      t+=String.fromCharCode(r&63|128)
    }
  }
  return t
},
_utf8_decode:function(e){
  var t="";
  var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

// Define the string
var string = 'Hello World!';

// Encode the String
var encodedString = Base64.encode(string);
alert(encodedString); // Outputs: "SGVsbG8gV29ybGQh"

// Decode the String
var decodedString = Base64.decode(encodedString);
alert(decodedString); // Outputs: "Hello World!"

        var newLocation = 'ABDSv5/Encrypted/Videos';
        alert($base64.encode(file));
        var textFile = $cordovaFile.readAsText(cordova.file.externalRootDirectory+"Movies",file).toString();

      /*  var encryptedFile = CryptoJS.AES.encrypt(
                textFile,
                $rootScope.base64Key,
                { iv: $rootScope.iv });
      
      var fullyEncryptedFile = encryptedFile.ciphertext.toString(CryptoJS.enc.Base64);
      
        alert(textFile);
        (cordova.file.externalRootDirectory+newLocation,file.name, fullyEncryptedFile, true)
        
*/
          //move or write the encrypted file to the SD_Card
         $cordovaFile.moveFile(cordova.file.externalRootDirectory+"Movies", file.name, cordova.file.externalRootDirectory+newLocation, file.name)
          .then(function (success) {
            // success
              alert("File " + file.name+ " moved");
            }, function (error) {
              // error
                alert("File " + file.name+ " NOT moved");
            });
      };
    }

      if (ionic.Platform.isIOS()) {
      
      console.log('cordova.file.documentsDirectory: ' + cordova.file.documentsDirectory);
      
      fileTransferDir = cordova.file.documentsDirectory;
      fileDir = '';
      console.log('IOS FILETRANSFERDIR: ' + fileTransferDir);
      console.log('IOS FILEDIR: ' + fileDir);
    }

      if (ionic.Platform.isAndroid() || ionic.Platform.isIOS()) {
              
      }
    });
  });
});