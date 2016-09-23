angular.module('file.service', ['ionic', 'ngCordova'])
.service('FileService', function($q, $cordovaFile) {
    return {
        listDir: function(path) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            window.resolveLocalFileSystemURL(path,
              function (fileSystem) {
                var reader = fileSystem.createReader();
                reader.readEntries(
                  function (entries) {
                    deferred.resolve(entries);
                    /*window.localStorage.setItem('newsArticle12', localData);
                    var videodirectories = entries;
                    $scope.videodirectories = videodirectories;*/
                    /*var localData = JSON.parse(window.localStorage.getItem('newsArticle12');
                      $.each(function(key, value){
                        //handle the data
                      });*/
                },
                function (err) {
                  deferred.reject(err);
                }
              );
            }, function (err) {
              deferred.reject(err);
            }
            return deferred.promise;
        }
    }
});