app.controller('HomeTabCtrl', function($scope, $ionicPopup, $state, $ionicPlatform, $cordovaFile, $ionicHistory) {
	
	$scope.titleToShowUser = window.localStorage.getItem("userUsername") +" Home Page";
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
		 	//clear the Report screen
		 	$scope.s2 = "";

		 	//create backup name and folder on SD card
		 	var ROOT_OF_BACKUP_AND_RECOVERY = 'ABDSv5/';
		 	/*var BACKUP = 'ABDSv5/Backup'+timeStamp;*/
		 	var BACKUP = 'ABDSv5/Backup';

		 	document.addEventListener('deviceready', function () {

		 		// FAILED
		 		//fsPath = "file:///"; 												//RESULT: Error resolveLocalFileSystemURL code 5 (ENCODING_ERR)
		 		//fsPath = "/storage/extSdCard/"; 									//RESULT: Error resolveLocalFileSystemURL code 5 (ENCODING_ERR)
		 		//fsPath = "/storage/sdcard1/";  									//RESULT: Error resolveLocalFileSystemURL code 5 (ENCODING_ERR)
		 		//fsPath = "/storage/usbcard1/";  									//RESULT: Error resolveLocalFileSystemURL code 5 (ENCODING_ERR)
		 		//fsPath = "/storage/sdcard0/";  									//RESULT: Error resolveLocalFileSystemURL code 5 (ENCODING_ERR)
		 		//fsPath = "storage/extSdCard/"; 									//RESULT: Error resolveLocalFileSystemURL code 5 (ENCODING_ERR)
		 		//fsPath = "file:///storage/extSdCard/"; 							//RESULT: Error resolveLocalFileSystemURL code 5 (ENCODING_ERR)
		 		//fsPath = "file:///storage/sdcard1/";								//RESULT: Error resolveLocalFileSystemURL code 5 (ENCODING_ERR)
		 		//fsPath = "file:///storage/sdcard0/";								//RESULT: Error resolveLocalFileSystemURL code 5 (ENCODING_ERR)
		 		//fsPath = "file:///storage/usbcard1/";								//RESULT: Error resolveLocalFileSystemURL code 5 (ENCODING_ERR)
		 		fsPath = 'file:///storage/extSdCard/‌​';							//RESULT: Error resolveLocalFileSystemURL code 5 (ENCODING_ERR)
		 		//fsPath = "file:///data/user/0/com.ionicframework.abdsv5451959/"; 	//RESULT: Error resolveLocalFileSystemURL code 5 (ENCODING_ERR)
		 		//fsPath = cordova.file.applicationStorageDirectory;				//RESULT: Error resolveLocalFileSystemURL code 5 (ENCODING_ERR)
		 		
		 		//PARTIALLY WORKS		 		
		 		//fsPath = cordova.file.externalRootDirectory; 		//RESULT: folder created on phone Local storage NOT SD Card
		 		//fsPath = "file:///storage/emulated/0/"; 			//RESULT: folder created on phone Local storage NOT SD Card

		 		//PERFECT Creates a folder on hte SDCard
		 		//TODO: Find the correct path to have folder created/copied to the memory card
		 		


// http://stackoverflow.com/questions/26126319/create-directory-on-external-sdcard-in-cordova
alert('Device ready function called '+fsPath+' is being passed to to resolveLocalFileSystemURL');

		 		                 window.resolveLocalFileSystemURL(fsPath, function(fileSystem) {
						            console.log("Root = " + fsPath);
						            fileSystem.getDirectory("newDir4", {create: true, exclusive: false},

						            function(dirEntry) {
						                dirEntry.getFile("newFile4.txt", {create: true, exclusive: false}, function (fileEntry) {
						                    console.log("File = " + fileEntry.fullPath);
						                    alert("SUCCESSFUL");
						                }, function (error) {
						                    alert('fileEntry: ' +error.code);
						                });
						            }, function (error) {
						               alert('dirEntry: ' +error.code);
						            });
						       }, function (error) {
						               alert('resolveLocalFileSystemURL: ' +error.code);
						       });

		 	/*	//Check the  External storage (SD card) root. (Android, BlackBerry 10) for a folder named ABDSv5
		 		$cordovaFile.checkDir(cordova.file.externalDataDirectory, ROOT_OF_BACKUP_AND_RECOVERY)
		 				//If the ABDSv5 folder is found
		 				.then(function (success) {
		 					alert(ROOT_OF_BACKUP_AND_RECOVERY + " folder found");
		 					$scope.rootDirectoryExist += ' '+ ROOT_OF_BACKUP_AND_RECOVERY + ' Exist';
		 				}, function (error) {
		 					alert(ROOT_OF_BACKUP_AND_RECOVERY + " folder was NOT found");
		 					$scope.rootDirectoryExist += ' '+ ROOT_OF_BACKUP_AND_RECOVERY +' Does not Exist';
		 					$cordovaFile.createDir(cordova.file.externalDataDirectory, ROOT_OF_BACKUP_AND_RECOVERY, true)
		 						.then( function(success) {
		 							alert('Directory '+ ROOT_OF_BACKUP_AND_RECOVERY +' was created successfully.');
		 							$scope.rootDirectoryCreated = 'Directory '+ ROOT_OF_BACKUP_AND_RECOVERY +' was created successfully.';
		 						}, function(error){
		 							alert('Directory '+ ROOT_OF_BACKUP_AND_RECOVERY +' was not created due to ' + error +'.');
		 							$scope.rootDirectoryCreated ='Directory '+ ROOT_OF_BACKUP_AND_RECOVERY +' was not created due to ' + error +'.';
							});//end of error creating root of backup
					});//end of error that the directory does not exist
*/

		 		/*var currentPlatform = ionic.Platform.platform();
		 		$scope.currentPlatform = "Step 1: You are using "+ currentPlatform + " device.";
		 		$cordovaFile.getFreeDiskSpace()
		 			.then(function (success) {
		 				$scope.freeSpace = 'Step 2: You have '+ success +' kilobytes of free space';
		 			}, function (error) {
		 				var alertPopup = $ionicPopup.alert({
		 					title: 'No Free Space!',
		 					template: 'No free space available or memory card is corrupted.'
		 				});//end of alert popup
		 			});//end of error free space

		 			$scope.rootDirectoryExist = 'Step 3: Does the ABDS root folder exist on the user external memory?';
		 			$cordovaFile.checkDir(cordova.file.externalRootDirectory, ROOT_OF_BACKUP_AND_RECOVERY)
		 				.then(function (success) {
		 					$scope.rootDirectoryExist += ' '+ ROOT_OF_BACKUP_AND_RECOVERY + ' Exist';
		 				}, function (error) {
		 					$scope.rootDirectoryExist += ' '+ ROOT_OF_BACKUP_AND_RECOVERY +' Does not Exist';
		 					$cordovaFile.createDir(cordova.file.externalRootDirectory, ROOT_OF_BACKUP_AND_RECOVERY, true)
		 						.then( function(success) {
		 							$scope.rootDirectoryCreated = 'Directory '+ ROOT_OF_BACKUP_AND_RECOVERY +' was created successfully.';
		 						}, function(error){
		 							$scope.rootDirectoryCreated ='Directory '+ ROOT_OF_BACKUP_AND_RECOVERY +' was not created due to ' + error +'.';
							});//end of error creating root of backup
					});//end of error that the directory does not exist

		 			//Check to see if the BACKUP already exist
		 			$cordovaFile.checkDir(cordova.file.externalRootDirectory, BACKUP)
		 				.then(function (success) {
		 					//if it does exist simply assign directoryExist the string below
		 					$scope.directoryExist = 'Directory '+ BACKUP +' Exist';
		 				}, function (error) {
		 					//tell the user that the backup already exist
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

					// $scope.s1 = cordova.file.externalRootDirectory;
					var videodirectories = [];

					$ionicPlatform.ready(function() {
				      if (ionic.Platform.isAndroid()) {
				        function listDir(path){
				          window.resolveLocalFileSystemURL(path,
				            function (fileSystem) {
				              var reader = fileSystem.createReader();
				              reader.readEntries(
				                function (entries) {
				                  //$scope.s3 = entries.length();
				                  videodirectories = entries;
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

				      function copyDirToBackUp(folder){
				      	//The cordova file library is being used to coppy the given folder to the user external root directory
				      	//cordova.file.externalDataDirectory
				      	$cordovaFile.copyDir(cordova.file.externalRootDirectory,folder,cordova.file.externalRootDirectory+BACKUP,folder)
							.then(function (success) {
									// success
									$scope.s2 += "Folder "+folder+" was copied. \n";

							}, function (error) {
								// error
								console.log(error);
								$scope.s2 += "Folder "+folder+" was NOT coppied to external memory. \n";
								//ensures that if the folder was not coppied the first time it gets copied the second time
								copyDirToBackUp(folder);
							});
				      }

				      function copyBackupToSDCard(folder){
				      	//The cordova file library is being used to coppy the given folder to the user external root directory
				      	//cordova.file.externalDataDirectory
				      	$cordovaFile.copyDir(cordova.file.externalRootDirectory,folder,cordova.file.externalDataDirectory,BACKUP)
							.then(function (success) {
									// success
									$scope.s2 += "copyBackupToSDCard "+folder+" was copied. \n";

							}, function (error) {
								// error
								console.log(error);
								$scope.s2 += "copyBackupToSDCard "+folder+" was NOT coppied to "+cordova.file.externalDataDirectory+" memory. \n";
								//ensures that if the folder was not coppied the first time it gets copied the second time
								//copyBackupToSDCard(folder);
							});
				      }
				      	// The below shows a lists of all the files and folders currently on the users root directory
				       //  listDir(cordova.file.externalRootDirectory);
				        $scope.s2 = "";
				        $scope.s2 += "Report from "+BACKUP+":";
				        copyDirToBackUp("Download");
				        copyDirToBackUp("Music");
				        copyDirToBackUp("Pictures");
				        copyDirToBackUp("Movies");
				        copyDirToBackUp("Documents");
				        copyDirToBackUp("DCIM");
				        copyDirToBackUp("Android");
				        copyDirToBackUp("Studio");
				        copyDirToBackUp("Playlists");
				        copyDirToBackUp("Ringtones");
				        copyDirToBackUp("Podcasts");
				        copyDirToBackUp("Notifications");
				        copyDirToBackUp("Alarms");

				        alert(cordova.file.externalDataDirectory);
				        //copyBackupToSDCard("ABDSv5");



				    }//end of if platform is android
				});//end of ionic platform ready

				  //   $cordovaFile.copyFile(cordova.file.externalRootDirectory, "demo.mp4", cordova.file.externalRootDirectory+BACKUP,"demo.mp4")
						// .then(function (success) {                
		    //             $scope.s2 = "here passed" ;
		    //           }, function (error) {
		                
		    //             $scope.s2 = "here error trying to copy data from phone to SD Card";
		    //           });
					*/
    	});//end of device ready
	}//end of backup function
});//end of home controller