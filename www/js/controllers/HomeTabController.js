app.controller('HomeTabCtrl', function($scope, $ionicPopup, $state, $ionicPlatform, $cordovaFile, $ionicHistory) {
	
	$scope.titleToShowUser = window.localStorage.getItem("userUsername") +" Home Page";
	var date = new Date();
	var hour = date.getHours();
	var min = date.getMinutes();
	var seconds = date.getSeconds();

	var timeStamp = hour+"-"+min+"-"+seconds;
	$scope.timeNow = date;
		console.log(timeStamp);

	//Tells the application what folder to create or look for when doing backup
	var ROOT_OF_BACKUP_AND_RECOVERY = 'ABDSv5/';
	var ROOT_OF_APP_BACKUP = 'AppsBackup/';
	var ROOT_OF_DATA_BACKUP = 'DataBackup/';
	var ROOT_OF_ANDROID_OS_BACKUP = 'AndroidOSBackup/';
	
	//The below is no longer being used
 	//var BACKUP = ROOT_OF_BACKUP_AND_RECOVERY;

	var file_system_path = cordova.file.externalRootDirectory; 						//RESULT: folder created in Local storage Device Storage NOT SD Card
	//var file_system_path = "file:///storage/emulated/0/"; 							//RESULT: folder created in Local storage Device Storage NOT SD Card
	//var file_system_path = 'cdvfile://localhost/sdcard/';							//RESULT: folder created in Local storage Device Storage NOT SD Card
	//var file_system_path = 'cdvfile:///sdcard/';									//RESULT: folder created in Local storage Device Storage NOT SD Card
	//var file_system_path = 'file:///sdcard/';										//RESULT: folder created in Local storage Device Storage NOT SD Card
	
	
	
	//PERFECT Creates a folder on hte SDCard
	//TODO: Find the correct path to have folder created/copied to the memory card

	/*
	Function name: backup
	Parameters: Nil
	Functionality:
	 	STEP ONE BACKUP USER DATA
	 	-create the file  or folder for the backup to be saved in.
	 	-The file will be named using the current date and time and a user input.
	 	-The above was changed to just have one backup of all user data in a folder called ABDSBackupFolder.
		because we did not want to have the user waste memory having multiple backups.
		NB this could be changed to say maximum of five backups
		-
	*/

	$scope.backup = function(){
	 	//Displays in the console exactly when the backup function was called
	 	console.log('Starting backup of user data');
	 	//clear the screen that keeps the user informed
	 	clearReportAreaForBackup();
	 	CreateAllBackUpFolders();
	 	document.addEventListener('deviceready', DeviceReadyFunction);//end of device ready
	}//end of backup function

	var DeviceReadyFunction = function () {
		CreateAllBackUpFolders();
		//alert('Device ready function called '+file_system_path+' is being passed to to resolveLocalFileSystemURL');

		// request the persistent file system a file system in which to store application data.
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFileSystemError);

		//window.resolveLocalFileSystemURL(url, successCallback, errorCallback);
		//the function below creates a directory and a file in the specified path
		//window.resolveLocalFileSystemURL(file_system_path, successfullyAccessedFileSystem, errorAccessedFileSystem);

/* 		//Check the  External storage (SD card) root. (Android, BlackBerry 10) for a folder named ABDSv5
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

 		var currentPlatform = ionic.Platform.platform();
 		$scope.currentPlatform = "Step 1: You are using "+ currentPlatform + " device.";
 		$cordovaFile.getFreeDiskSpace()
 			.then(function (success) {
 				$scope.freeSpace = 'Step 2: You have '+ success +' kilobytes of free space';
 			}, function (error) {
 				var alertPopup = $ionicPopup.alert({
 					title: 'No Free Space!',
 					template: 'No free space available or memory is corrupted.'
 				});//end of alert popup
 			});//end of error free space

 			$scope.rootDirectoryExist = 'Step 3: Does the ABDS root folder exist on the user external memory?';
 			

 			$cordovaFile.checkDir(file_system_path, ROOT_OF_BACKUP_AND_RECOVERY)
 				.then(function (success) {
 					$scope.rootDirectoryExist += ' '+ ROOT_OF_BACKUP_AND_RECOVERY + ' Exist';
 				}, function (error) {
 					$scope.rootDirectoryExist += ' '+ ROOT_OF_BACKUP_AND_RECOVERY +' Does not Exist';
 					$cordovaFile.createDir(file_system_path, ROOT_OF_BACKUP_AND_RECOVERY, true)
 						.then( function(success) {
 							$scope.rootDirectoryCreated = 'Directory '+ ROOT_OF_BACKUP_AND_RECOVERY +' was created successfully.';
 						}, function(error){
 							if(error.code == 1){
 								CreateAllBackUpFolders();
 							}else{
 								$scope.rootDirectoryCreated ='Directory '+ ROOT_OF_BACKUP_AND_RECOVERY +' was not created due to error code ' + error.code +'.';	
 							} 							
					});//end of error creating root of backup
			});//end of error that the directory does not exist

 			/*//Check to see if a BACKUP already exist
 			$cordovaFile.checkDir(file_system_path+ROOT_OF_BACKUP_AND_RECOVERY, 'DataBackup/')
 				.then(function (success) {
 					//if it does exist simply assign directoryExist the string below
 					$scope.directoryExist = 'Directory '+ BACKUP +' Exist';
 				}, function (error) {
 					//tell the user that the backup already exist
 					$scope.directoryDoesNotExist = 'Directory '+ BACKUP +' Does not Exist it will be created now.';
					$cordovaFile.createDir(file_system_path, BACKUP, true)
						.then( function(success) {
							$scope.directoryCreated = 'Directory '+ BACKUP +' was created.';
						}, function(error){
							$scope.stepone ='Directory '+ BACKUP +' was not created due to error code ' + error.code +'.';
						});//end of error creating root of backup
				});//end of error that the directory does not exist*/

			// $scope.s1 = cordova.file.externalRootDirectory;
			//var videodirectories = [];

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
		                  alert(videodirectories[0]);
		                  //window.localStorage.setItem('newsArticle12', localData);		
		    videodirectories.forEach(function(element) {
    //alert(element.name);
    copyDirToBackUp(element.name);
});		                  

		              },
		              function (err) {
		                console.log(err);
		              }
		            );
		          }, function (err) {
		            console.log(err);
		          }
		        );
		    }//end of listDir function


		    function copyDirToBackUp(folder){
		      	//$scope.s2 +='check if the folder '+folder +' exist in ' +file_system_path+BACKUP +' exist.';
		      	//check if the folder already exist in data backup
		      	$cordovaFile.checkDir(file_system_path+ROOT_OF_BACKUP_AND_RECOVERY+ROOT_OF_DATA_BACKUP, folder)
 				.then(function (success) {
 					//Delete the already existing directory
 					$cordovaFile.removeRecursively(file_system_path+ROOT_OF_BACKUP_AND_RECOVERY+ROOT_OF_DATA_BACKUP,folder)
				      .then(function (success) {
				      	// success fully removed previous backup of the directory
				        //The cordova file library is being used to coppy the given folder to the user external root directory
				      	//cordova.file.externalDataDirectory
				      	$cordovaFile.copyDir(file_system_path,folder,file_system_path+ROOT_OF_BACKUP_AND_RECOVERY+ROOT_OF_DATA_BACKUP,folder)
							.then(function (success) {
									// success
									$scope.s2 += "Folder "+folder+" was copied. \n";
							}, function (error) {
								//alert("Folder "+folder+" was NOT copied error "+error.code);
								//copyDirToBackUp(folder);
								// error
								console.log("Folder "+folder+" was NOT copied error "+error.code);
								//$scope.s2 += "Folder "+folder+" was NOT coppied to external memory. \n";
								//ensures that if the folder was not coppied the first time it gets copied the second time						
							});
				      }, function (error) {
				        // error removing previous backup of the directory
				        console.log("Folder "+folder+" was not removed sucssfully. \n");
				        //$scope.s2 += "Folder "+folder+" was not removed sucssfully. \n";
				        //alert("Folder "+folder+" was not removed sucssfully. \n");
				      });
 					},function (error) {
	 					//alert('directory '+folder +' does NOT exist');
	 					//$scope.s2 += 'directory '+folder +' does NOT exist';
	 					//The directory does not exist in the backup so it must be created
	 					$cordovaFile.createDir(file_system_path+ROOT_OF_BACKUP_AND_RECOVERY+ROOT_OF_DATA_BACKUP, folder, true)
						.then( function(success) {
							$scope.s2 +='Directory '+ folder +' was created.';
							//The cordova file library is being used to coppy the given folder to the user external root directory
					      	//cordova.file.externalDataDirectory
					      	$cordovaFile.copyDir(file_system_path,folder,file_system_path+ROOT_OF_BACKUP_AND_RECOVERY+ROOT_OF_DATA_BACKUP, folder)
								.then(function (success) {
										// success
										$scope.s2 += "Folder "+folder+" was copied. \n";
								}, function (error) {
									//copyDirToBackUp(folder);
									// error
									console.log(error);
									$scope.s2 += "Folder "+folder+" was NOT coppied to external memory error code "+ error.code+" \n";
									//ensures that if the folder was not coppied the first time it gets copied the second time						
								});
						}, function(error){
							if(error.code == 1){
 								CreateAllBackUpFolders();
 							}else{
 								alert('Directory '+ folder +' was not created due to error code ' + error.code +'.');
 							}							
						});//end of error creating root of backup	 					
					}
				);
			}//end of copyDirToBackup

		      /*function copyBackupToSDCard(folder){
		      	//The cordova file library is being used to coppy the given folder to the user external root directory
		      	//cordova.file.externalDataDirectory
		      	$cordovaFile.copyDir(file_system_path,folder,cordova.file.externalDataDirectory,BACKUP)
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
		      }*/
		      
		      // The below shows a lists of all the files and folders currently on the users root directory







		        $scope.s2 = "";
		        $scope.s2 += "Report from "+file_system_path+ROOT_OF_BACKUP_AND_RECOVERY+ROOT_OF_DATA_BACKUP+" :";
		        listDir(file_system_path);

		        var success = function(app_list) { alert(JSON.stringify((app_list))); };
    			var error = function(app_list) { alert("Oopsie! " + app_list); };
    			Applist.createEvent('', '', '', '', '', success, error);
		        // copyDirToBackUp("Download");
		        // copyDirToBackUp("Music");
		        // copyDirToBackUp("Pictures");
		        // copyDirToBackUp("Movies");
		        // copyDirToBackUp("Documents");
		        // copyDirToBackUp("DCIM");
		        // copyDirToBackUp("Android");
		        // copyDirToBackUp("Studio");
		        // copyDirToBackUp("Playlists");
		        // copyDirToBackUp("Ringtones");
		        // copyDirToBackUp("Podcasts");
		        // copyDirToBackUp("Notifications");
		        // copyDirToBackUp("Alarms");

		        //alert(cordova.file.externalDataDirectory);
		        //copyBackupToSDCard("ABDSv5");

		        //TODO:Encrypt the BACUPFOLDER

		    }//end of if platform is android
		});//end of ionic platform ready
	}//end of Device ready function
		

		  //   $cordovaFile.copyFile(cordova.file.externalRootDirectory, "demo.mp4", cordova.file.externalRootDirectory+BACKUP,"demo.mp4")
				// .then(function (success) {                
    //             $scope.s2 = "here passed" ;
    //           }, function (error) {
                
    //             $scope.s2 = "here error trying to copy data from phone to SD Card";
    //           });

 	//Clear the Report screen
	//the Report screen is the area on the homt.html page that updates the user about the backup.
	var CreateAllBackUpFolders = function(){
		//Root of all ABDS backups
		CreateABackupFolder(file_system_path,ROOT_OF_BACKUP_AND_RECOVERY);
		//Data backup folder
		CreateABackupFolder(file_system_path+ROOT_OF_BACKUP_AND_RECOVERY,ROOT_OF_APP_BACKUP);
		//App backup folder
		CreateABackupFolder(file_system_path+ROOT_OF_BACKUP_AND_RECOVERY,ROOT_OF_DATA_BACKUP);
		//OS backup folder
		CreateABackupFolder(file_system_path+ROOT_OF_BACKUP_AND_RECOVERY,ROOT_OF_ANDROID_OS_BACKUP);
	}

	var CreateABackupFolder = function(parent_directory,folderToBeCreated){
		$cordovaFile.checkDir(parent_directory, folderToBeCreated)
 				.then(function (success) {
 					$scope.rootDirectoryExist += ' '+ folderToBeCreated + ' Exist';
 				}, function (error) {
 					$scope.rootDirectoryExist += ' '+ folderToBeCreated +' Does not Exist';
 					$cordovaFile.createDir(parent_directory, folderToBeCreated, true)
 						.then( function(success) {
 							$scope.rootDirectoryCreated = 'Directory '+ folderToBeCreated +' was created successfully.';
 						}, function(error){
 							if(error.code == 1){
 								CreateAllBackUpFolders();
 							}else{
 								$scope.rootDirectoryCreated ='Directory '+ folderToBeCreated +' was not created due to error code ' + error.code +'.';
 							} 							
					});//end of error creating root of backup
			});//end of error that the directory does not exist
	}

	var clearReportAreaForBackup = function(){
		$scope.s1 = "";
		$scope.s2 = "";
		$scope.s3 = "";
		$scope.currentPlatform = "";
		$scope.freeSpace = "";
		$scope.rootDirectoryExist = "";
		$scope.rootDirectoryCreated = "";
		$scope.stepone = "";
	}//end of clear the Report screen function

	var successfullyAccessedFileSystem = function(fileSystem) {
		console.log("Root = " + file_system_path);
		fileSystem.getDirectory("ABDSv5", {create: true, exclusive: false}, afterDirectoryIsCreated,dirEntryError);
   	}

   	var errorAccessedFileSystem = function (error) {
   		alert('errorAccessedFileSystem: ' +error.code);
   	}

   	var dirEntryError = function (error) {
   		alert('dirEntryError: ' +error.code);
   	}

   	var onFileSystemError = function(error){
		alert('FileSystemError: ' +evt.target.error.code);
	}
   	var fileEntryError = function (error) {
   		alert('fileEntryError: ' +error.code);
   	}

   	var pathToCreatedFile = function (fileEntry) {
   		console.log("File = " + fileEntry.fullPath);
   		alert("SUCCESSFUL");
   	}

   	var afterDirectoryIsCreated = function(dirEntry) {
   		dirEntry.getFile("newFile5.txt", {create: true, exclusive: false}, pathToCreatedFile,fileEntryError);
   	}

   	var onFileSystemSuccess = function(fileSystem) {
	    console.log('File System name: '+fileSystem.name);
	    //alert('File System sucess name of file system is: '+ fileSystem.name);
	}
	
});//end of home controller