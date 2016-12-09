app.controller('HomeTabCtrl', function($scope, $ionicPopup, $state, $ionicPlatform, $cordovaFile, $ionicHistory) {
	
	var date = new Date();
	var hour = date.getHours();
	var min = date.getMinutes();
	var seconds = date.getSeconds();

	var timeStamp = hour+"-"+min+"-"+seconds;
		$scope.timeNow = date;
		console.log(timeStamp);

		 $scope.backup = function(){
		 /*create the file  or folder for the backup to be saved in.
		 The file will be named using the current date and time and a user input*/
	console.log('Starting backup');

	//create backup name and folder on SD card
	var ROOT_OF_BACKUP_ANDRECOVERY = 'ABDSv5/';
	var BACKUP = 'ABDSv5/Backup'+timeStamp;

	document.addEventListener('deviceready', function () {
		var currentPlatform = ionic.Platform.platform();
		$scope.currentPlatform = "Step 1 You are using "+ currentPlatform + " device.";
		$cordovaFile.getFreeDiskSpace()
			.then(function (success) {
				$scope.freeSpace = 'Step 2 You have '+ success +' kilobytes of free space';
			}, function (error) {
				var alertPopup = $ionicPopup.alert({
					title: 'No Free Space!',
					template: 'No free space available or m,emory card is corrupted.'
				});
			});//end of error free space

			$cordovaFile.checkDir(cordova.file.externalRootDirectory, ROOT_OF_BACKUP_ANDRECOVERY)
					.then(function (success) {
						$scope.rootDirectoryExist = 'Step 3 Does the ABDS root folder exist on the user external memory? '+ ROOT_OF_BACKUP_ANDRECOVERY + ' Exist';
					}, function (error) {
						$scope.rootDirectoryExist = 'Step 3 Does the ABDS root folder exist on the user external memory? '+ ROOT_OF_BACKUP_ANDRECOVERY +' Does not Exist';
						$cordovaFile.createDir(cordova.file.externalRootDirectory, ROOT_OF_BACKUP_ANDRECOVERY, true)
							.then( function(success) {
								console.log('Directory '+ ROOT_OF_BACKUP_ANDRECOVERY +' was created successfully.');
								$scope.rootDirectoryCreated = 'Directory '+ ROOT_OF_BACKUP_ANDRECOVERY +' was created.';
							}, function(error){
								$scope.rootDirectoryCreated ='Directory '+ ROOT_OF_BACKUP_ANDRECOVERY +' was not created due to ' + error +'.';
							});//end of error creating root of backup
					});//end of error that the directory does not exist

				//Check to see if the BACKUP already exist
				$cordovaFile.checkDir(cordova.file.externalRootDirectory, BACKUP)
					.then(function (success) {
						//if it does exist simply assign directoryExist the string below
						$scope.directoryExist = 'Directory '+ BACKUP +' Exist';
					}, function (error) {
						//
						$scope.directoryDoesNotExist = 'Directory '+ BACKUP +' Does not Exist';
						//Create the BACKUP directory for storing this particular backup
						$cordovaFile.createDir(cordova.file.externalRootDirectory, BACKUP, true)
							.then( function(success) {
								console.log('Directory '+ BACKUP +' was created successfully.');
								$scope.directoryCreated = 'Directory '+ BACKUP +' was created.';
							}, function(error){
								$scope.stepone ='Directory '+ BACKUP +' was not created due to ' + error +'.';
							});//end of error creating root of backup
					});//end of error that the directory does not exist
					/*$scope.s1 = cordova.file.externalRootDirectory;*/

    $ionicPlatform.ready(function() {
      if (ionic.Platform.isAndroid()) {
        function listDir(path){
          window.resolveLocalFileSystemURL(path,
            function (fileSystem) {
              var reader = fileSystem.createReader();
              reader.readEntries(
                function (entries) {
                  var videodirectories = entries;
                  //$scope.s3 = entries.length();
                  $scope.videodirectories = videodirectories;
                  //window.localStorage.setItem('newsArticle12', localData);
                  
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
        listDir(cordova.file.externalRootDirectory);    

    }});

		/*$cordovaFile.copyFile(cordova.file.externalRootDirectory, "demo.mp4", cordova.file.externalRootDirectory+BACKUP,"demo.mp4")
              .then(function (success) {
                
                $scope.s2 = "here passed" ;
              }, function (error) {
                
                $scope.s2 = "here error trying to copy data from phone to SD Card";
              });*/

$scope.s2 = videodirectories;/*
				// COPY
				$cordovaFile.copyDir(cordova.file.externalRootDirectory,"Music",cordova.file.externalRootDirectory+BACKUP, "Music")
					.then(function (success) {
						// success
						$scope.s2 = "here passed" ;

				}, function (error) {
					// error
					console.log(error);
					$scope.s2 = "here error trying to copy data from phone to SD Card";
				});*/

    		});//end of device ready
	}//end of backup function

});//end of home controller