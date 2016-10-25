angular.module('file.service', ['ionic', 'ngCordova'])
/**
*The File Service uses ionic and ngCordova and the $cordovaFile
*To return an object containing a list of files and directorries based on a given path
*/
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