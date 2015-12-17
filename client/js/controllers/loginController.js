discBoard.controller('loginController', function($scope, $state, LoginFactory) {
   var mv = this;

   mv.loginToBoard = function() {
      mv.errors = {};
      LoginFactory.loginUser(mv.loginUser, function(response){
         console.log('response from factory', response);
         mv.checkLogin();
      });
   }

   mv.checkLogin = function() {
      console.log(LoginFactory.getUser());
      if (LoginFactory.getUser()) {
         console.log('user is logged in');
         $state.go('dashboard.main');
      }
   }

   mv.checkLogin();
});