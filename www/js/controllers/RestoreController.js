app.controller('RestoreCtrl', function($scope, $ionicPopup, $state, $ionicPlatform, $cordovaFile, $ionicHistory) {
	$scope.titleToShowUser = window.localStorage.getItem("userUsername") +" Home Page";

	//alert('RestoreCtrl');
	//$ionicHistory.clearHistory();
	$scope.restore = function(){
		console.log('Starting backup of user data');
		//clear the screen that keeps the user informed
	 	clearReportAreaForBackup();
		
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