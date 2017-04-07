app.controller('HomeTabCtrl', function($scope, $ionicPopup, $state, $ionicPlatform, $cordovaFile, $ionicHistory) {
	var successResult = "";
	var errorResult = "";
	$scope.titleToShowUser = window.localStorage.getItem("userUsername") +" Home Page";
	var date = new Date();
	var hour = date.getHours();
	var min = date.getMinutes();
	var seconds = date.getSeconds();

	var timeStamp = hour+"-"+min+"-"+seconds;
	$scope.timeNow = date;
		console.log(timeStamp);

	var ROOT_OF_BACKUP_AND_RECOVERY = 'ABDSv5/';
	var ROOT_OF_APP_BACKUP = 'AppsBackup/';
	var ROOT_OF_DATA_BACKUP = 'DataBackup/';
	var ROOT_OF_ANDROID_OS_BACKUP = 'AndroidOSBackup/';
	var file_system_path = cordova.file.externalRootDirectory;
	//TODO: Find the correct path to have folder created/copied to the memory card

	$scope.restore = function(){
		console.log('Starting restore of user data');
	 	clearReportAreaForBackup();
	 	document.addEventListener('deviceready',listRecoveryDir(file_system_path+ROOT_OF_BACKUP_AND_RECOVERY+ROOT_OF_DATA_BACKUP));
	}

	function listRecoveryDir(path){
	  	$ionicPlatform.ready(function() {
	      if (ionic.Platform.isAndroid()) {
	          window.resolveLocalFileSystemURL(path, function(fileSystem) {
	          	var reader = fileSystem.createReader();
	          	reader.readEntries(
	          		function (entries) {
	                  existingBackupDirectory = entries;
					  existingBackupDirectory.forEach(function(element) {
			 					$cordovaFile.createDir(file_system_path,element.name,true)
							      .then(function (success) {
							      	$cordovaFile.copyDir(file_system_path+ROOT_OF_BACKUP_AND_RECOVERY+ROOT_OF_DATA_BACKUP,element.name,file_system_path,element.name)
										.then(function (success) {
												$scope.s2 += 'successfully restored ' +element.name;
										}, function (error) {
											$scope.s2 += "Folder "+folder+" was NOT copied error "+error.code;
										});
							      }, function (error) {
							        console.log("Folder "+element.name+" was not removed sucssfully. \n");
							        alert("Folder "+element.name+" was not Created sucssfully. \n"+ error.code);
							      });
							  });
					  });
	              }, function(err) {
	              	alert('hi'+err.code);
	                console.log(err);
	              });
	          }else{
	          	alert('The user is not on and android device');
	          }
	    });
	    	return;
	}

	var CheckThatBackupExist = function(){
		$cordovaFile.checkDir(file_system_path, ROOT_OF_BACKUP_AND_RECOVERY+ROOT_OF_DATA_BACKUP)
 				.then(function (success) {
 					$scope.rootDirectoryExist += ' '+ ROOT_OF_BACKUP_AND_RECOVERY+ROOT_OF_DATA_BACKUP + ' Exist';
 				}, function (error) {
 					$scope.rootDirectoryExist += ' '+ ROOT_OF_BACKUP_AND_RECOVERY+ROOT_OF_DATA_BACKUP +' Does not Exist';
 					alert("please make a backup of your device before trying to restore.");
		});
	}

	$scope.backup = function(){
	 	console.log('Starting backup of user data');
	 	clearReportAreaForBackup();
	 	CreateAllBackUpFolders();
	 	document.addEventListener('deviceready', DeviceReadyFunction);
	}//end of backup function

	var DeviceReadyFunction = function () {
		CreateAllBackUpFolders();
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFileSystemError);		
 		var currentPlatform = ionic.Platform.platform();
 		
 		$scope.currentPlatform = "You are using "+ currentPlatform + " device.";
 		$cordovaFile.getFreeDiskSpace()
 			.then(function (success) {
 				$scope.freeSpace = 'You have '+ success +' kilobytes of free space';
 			}, function (error) {
 				var alertPopup = $ionicPopup.alert({
 					title: 'No Free Space!',
 					template: 'No free space available or memory is corrupted.'
 				});//end of alert popup
 			});//end of error free space

 			$scope.rootDirectoryExist = 'Checking to see if backup folder already exist on your device:';
 			

 			$cordovaFile.checkDir(file_system_path, ROOT_OF_BACKUP_AND_RECOVERY)
 				.then(function (success) {
 					$scope.rootDirectoryExist += ' '+ ROOT_OF_BACKUP_AND_RECOVERY + 'Backup folder exist';
 				}, function (error) {
 					$scope.rootDirectoryExist += ' '+ ROOT_OF_BACKUP_AND_RECOVERY +'Backup folder does NOT Exist';
 					$cordovaFile.createDir(file_system_path, ROOT_OF_BACKUP_AND_RECOVERY, true)
 						.then( function(success) {
 							$scope.rootDirectoryCreated = 'Folder '+ ROOT_OF_BACKUP_AND_RECOVERY +' was created successfully.';
 						}, function(error){
 							if(error.code == 1){
 								CreateAllBackUpFolders();
 							}else{
 								$scope.rootDirectoryCreated ='Folder '+ ROOT_OF_BACKUP_AND_RECOVERY +' was not created due to error code ' + error.code +'.';	
 							} 							
					});//end of error creating root of backup
			});//end of error that the directory does not exist

			$ionicPlatform.ready(function() {
		      if (ionic.Platform.isAndroid()) {
		        function listDir(path){
		          window.resolveLocalFileSystemURL(path,
		            function (fileSystem) {
		              var reader = fileSystem.createReader();
		              reader.readEntries(
		                function (entries) {
		                  videodirectories = entries;
		                  $scope.videodirectories = videodirectories;
						  videodirectories.forEach(function(element) {
						  	copyDirToBackUp(element);
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
		    	if(folder.isFile){
		    		$cordovaFile.checkFile(file_system_path+ROOT_OF_BACKUP_AND_RECOVERY+ROOT_OF_DATA_BACKUP, folder.name)
		    			.then(function (success) {
		    				$cordovaFile.removeFile(file_system_path+ROOT_OF_BACKUP_AND_RECOVERY+ROOT_OF_DATA_BACKUP, folder.name)
							    .then(function (success) {
							       $cordovaFile.copyFile(file_system_path,folder.name,file_system_path+ROOT_OF_BACKUP_AND_RECOVERY+ROOT_OF_DATA_BACKUP, folder.name)
									.then(function (success) {
										$scope.s2 += "File "+folder.name+" was copied. \n";
									}, function (error) {
										console.log(error);
										$scope.s2 += "File "+folder.name+" was NOT coppied to external memory error code: "+ error.code+" \n";
									});
							    }, function (error) {
							       alert("File "+folder.name+" was NOT removed due to error code: "+error.code);
							    });
		    			},function(error){
		    				$cordovaFile.copyFile(file_system_path,folder.name,file_system_path+ROOT_OF_BACKUP_AND_RECOVERY+ROOT_OF_DATA_BACKUP, folder.name)
								.then(function (success) {
										$scope.s2 += "File "+folder.name+" was copied. \n";
								}, function (error) {
									console.log(error);
									$scope.s2 += "File "+folder.name+" was NOT coppied to external memory error code: "+ error.code+" \n";
								});
		    			});
		    	}else if((folder.isDirectory)&&(folder.name != "ABDSv5")){
		    		$cordovaFile.checkDir(file_system_path+ROOT_OF_BACKUP_AND_RECOVERY+ROOT_OF_DATA_BACKUP, folder.name)
		 				.then(function (success) {
		 					$cordovaFile.removeRecursively(file_system_path+ROOT_OF_BACKUP_AND_RECOVERY+ROOT_OF_DATA_BACKUP,folder.name)
						      .then(function (success) {
						      	$cordovaFile.copyDir(file_system_path,folder.name,file_system_path+ROOT_OF_BACKUP_AND_RECOVERY+ROOT_OF_DATA_BACKUP,folder.name)
									.then(function (success) {
											$scope.s2 += "Folder "+folder.name+" was copied. \n";
											//TODO: call the Encrypt function on the copied directory
									}, function (error) {
										alert("Folder "+folder.name+" was NOT copied error "+error.code);
									});
						      }, function (error) {
						        console.log("Folder "+folder.name+" was not removed sucssfully. \n");
						        alert("Folder "+folder.name+" was not removed sucssfully. \n");
						      });
		 				},function (error) {
		 					$cordovaFile.createDir(file_system_path+ROOT_OF_BACKUP_AND_RECOVERY+ROOT_OF_DATA_BACKUP, folder.name, true)
							.then( function(success) {
								$scope.s2 +='Directory '+ folder.name +' was created.';
						      	$cordovaFile.copyDir(file_system_path,folder.name,file_system_path+ROOT_OF_BACKUP_AND_RECOVERY+ROOT_OF_DATA_BACKUP, folder.name)
									.then(function (success) {
											$scope.s2 += "Folder "+folder.name+" was copied. \n";
									}, function (error) {
										console.log(error);
										$scope.s2 += "Folder "+folder.name+" was NOT coppied to external memory error code "+ error.code+" \n";
									});
							}, function(error){
								if(error.code == 1){
	 								CreateAllBackUpFolders();
	 							}else{
	 								alert('Directory '+ folder.name +' was not created due to error code ' + error.code +'.');
	 							}							
							});//end of error creating root of backup	 					
						});
		    	}else if(folder.name === "ABDSv5"){
		    		return;
		    	}else{
		    		console.log("The folder "+folder.name+ "is not a file or a directory");
		    		alert("The folder "+folder.name+ "is not a file or a directory");
		    	}
			}//end of copyDirToBackup

			//http://stackoverflow.com/questions/42700300/cordova-encrypt-data-directory-files
			var AESFileEncryption = function(originalpath,originalfilename){
				var key = window.localStorage.getItem("EncryptedPassword");
				$cordovaFile.checkDir(originalpath, originalfilename)
				.then(function (success) {
					$cordovaFile.createDir(file_system_path+ROOT_OF_BACKUP_AND_RECOVERY+ROOT_OF_DATA_BACKUP, file, true)
					.then( function(success) {
						$scope.s2 +='\n\nDirectory '+ originalfilename +' was created in folder '+file_system_path+ROOT_OF_BACKUP_AND_RECOVERY+ROOT_OF_DATA_BACKUP+'.';
						window.resolveLocalFileSystemURL(file_system_path+ROOT_OF_BACKUP_AND_RECOVERY+ROOT_OF_DATA_BACKUP+originalfilename+"/",
				            function (fileSystem) {
				              var reader = fileSystem.createReader();
				              reader.readEntries(
				                function (entries) {
				                  videodirectories = entries;
				                  $scope.videodirectories = videodirectories;
				                  videodirectories.forEach(function(element) {
								  	alert("Folder "+originalfilename+" contains "+element.name);
								  	AESFileEncryption(file_system_path+ROOT_OF_BACKUP_AND_RECOVERY+ROOT_OF_DATA_BACKUP+originalfilename+"/",element.name);
								  });
				              },
				              function (err) {
				              	alert("error reading entries from "+originalpath+".");
				                console.log(err);
				              });
				          }, function (err) {
				          	alert("error opening file system reading entries from "+originalpath+".");
				            console.log(err);
				          });
					}, function(error){
						alert('\n\nDirectory '+ folder +' was not created due to error code ' + error.code +'.');
					});//end of error creating directory in root of data backup
		      }, function (error) {
		        if(error.code == 13){
		        	$cordovaFile.checkFile(originalpath, originalfilename)
						.then(function (success) {
							alert("code 13 "+originalfilename+" is a file in the "+originalpath+" directory.");
							 $cordovaFile.createFile(file_system_path+ROOT_OF_BACKUP_AND_RECOVERY+ROOT_OF_DATA_BACKUP, file, true)
						      .then(function (success) {
		   	alert(originalfilename+" was created in the "+file_system_path+ROOT_OF_BACKUP_AND_RECOVERY+ROOT_OF_DATA_BACKUP+".");
						        var encrypted = CryptoJS.AES.encrypt(originalfilename,key);
						        $cordovaFile.writeFile(file_system_path+ROOT_OF_BACKUP_AND_RECOVERY+ROOT_OF_DATA_BACKUP, file, encrypted, true)
							      .then(function (success) {
							        alert("success");
							        $scope.s2 += "\n\nFolder "+originalfilename+" was encrypted and saved to backup copied.";
							      }, function (error) {
							      	alert("Error writing file "+originalfilename+" .");
							        $scope.s2 += "\n\nFolder "+originalfilename+" was NOT encrypted and saved to backup ERROR code: "+error.code;
							      });
						      }, function (error) {
						        alert("error when creating File file error code: "+error.code);
						      });
				      }, function (error) {
				        alert("error when checking that it is a file error code:"+error.code);
				      });
		        }else{
		        	alert("checkDir error code:"+error.code);
		        }
		      });	
			}

			$scope.s2 = "";
		    $scope.s2 += "Report from "+date+": "+file_system_path+ROOT_OF_BACKUP_AND_RECOVERY+ROOT_OF_DATA_BACKUP+" :";
		    listDir(file_system_path);
		    //TODO:Encrypt the BACUPFOLDER

		    }//end of if platform is android
		});//end of ionic platform ready
	}//end of Device ready function

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
		successResult = "";
		errorResult = "";
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
	}
	
});//end of home controller