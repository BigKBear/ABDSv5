angular.module('login.service', [])
/**
 * The LoginService handles saving and loading user
 * from local storage, and also lets us save and load the
 * last active project index.
 */
.service('LoginService', function($q) {
    return {
        loginUser: function(pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 
            if (pw == localStorage.getItem("userPassword")) {
                deferred.resolve('Welcome !');
            } else {
                deferred.reject('Wrong credentials given.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
});