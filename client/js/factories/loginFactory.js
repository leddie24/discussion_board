discBoard.factory('LoginFactory', function($localStorage, $sessionStorage, $http) {
   var factory = {};

   $sessionStorage.currUser;

   factory.loginUser = function(userinfo, callback) {
      console.log(userinfo);
      $http.post('/login', userinfo)
      .then(function(response){
         console.log(response, 'got user');
         $sessionStorage.currUser = response.data;
         callback(response);
         console.log('current user', $sessionStorage.currUser);
      })
      .catch(function(response) {
         console.log(response, "Error getting user");
      });
   }

   factory.getUser = function() {
      console.log($sessionStorage.currUser);
      return $sessionStorage.currUser;
   }

   factory.getUserById = function(id, callback) {
      $http.get('/userinfo/' + id)
      .then(function (response) {
         console.log('got data for user');
         callback(response.data);
      })
      .catch(function (response) {
         console.log(response, "Error getting user");
      })
   }

   factory.logOutUser = function() {
      $sessionStorage.currUser = null;
      
   }

   return factory;
});