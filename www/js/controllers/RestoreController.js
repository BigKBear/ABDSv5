app.controller('RestoreCtrl', function($scope, $ionicPopup, $state, $ionicPlatform, $cordovaFile, $ionicHistory) {
	$scope.titleToShowUser = window.localStorage.getItem("userUsername") +" Home Page";

	//Tells the application what folder to create or look for when doing backup
	var ROOT_OF_BACKUP_AND_RECOVERY = 'ABDSv5/';
	var ROOT_OF_APP_BACKUP = 'AppsBackup/';
	var ROOT_OF_DATA_BACKUP = 'DataBackup/';
	var ROOT_OF_ANDROID_OS_BACKUP = 'AndroidOSBackup/';
	var file_system_path = cordova.file.externalRootDirectory; 						//RESULT: folder created in Local storage Device Storage NOT SD Card

	//alert('RestoreCtrl');
	//$ionicHistory.clearHistory();
	$scope.restore = function(){
		console.log('Starting backup of user data');
		//clear the screen that keeps the user informed
	 	clearReportAreaForBackup();

	 	// check if a backup exist
	 	$cordovaFile.checkDir(file_system_path, ROOT_OF_BACKUP_AND_RECOVERY)
 				.then(function (success) {
 					$scope.rootDirectoryExist += ' '+ ROOT_OF_BACKUP_AND_RECOVERY + ' Exist';
 				}, function (error) {
 					$scope.rootDirectoryExist += ' '+ ROOT_OF_BACKUP_AND_RECOVERY +' Does not Exist';
 					alert("please make a backup of your device before trying to restore.");
			});//end of error that the directory does not exist
		
	};

	//Clear the Report screen
	//the Report screen is the area on the homt.html page that updates the user about the backup.
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
});//end of restore controller