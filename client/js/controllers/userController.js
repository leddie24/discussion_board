discBoard.controller('userController', function($stateParams, $scope, LoginFactory) {
   var mv = this;

   console.log($stateParams)


   mv.getUserInfo = function() {
      LoginFactory.getUserById($stateParams.id, function(data) {
         mv.userInfo = data;
      })
   }

   mv.getUserInfo();
});