/*
User Store Service
Creator: Kyle St.Hill
Purpose: Manage the user data
*/
angular.module('users.userstore', [])
   .factory('UserStore', function(){
    var users = angular.fromJson(window.localStorage['users'] || '[]');

    function persist(){
      window.localStorage['users'] = angular.toJson(users);
    }

    return {
      list:function(){
        return users;
      },

      getUser: function(userId){
        for(var i = 0; i < users.length; i++){
          if(users[i].id === userId){
            return users[i];
          }
        }
        return undefined;
      },

      createUser: function(user) {
        users.push(user);
        persist();
      },

      updateUser: function(user){
        for (var i = 0; i < users.length; i++) {
          if (users[i].id === user.id) {
            users[i] = user;
            persist();
            return;
          }
        }
      },

      /*move: function(note, fromIndex, toIndex){
        notes.splice(fromIndex,1);
        notes.splice(toIndex,0,note);
        persist();
      },
*/
      remove: function(userId){
          for(var i = 0; i < users.length; i++){
            if(users[i].id === userId){
              users.splice(i, 1);
              persist();
              return;
            }
        }
      }
    };

   });