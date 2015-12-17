var discBoard = angular.module('discussion_board', ['ngStorage', 'ui.router', 'ui.router.stateHelper']);

discBoard.config(function ($urlRouterProvider, stateHelperProvider) {
   stateHelperProvider
      .state({
         name: 'login', 
         url: '/',
         templateUrl: './partials/login.html',
         controller: 'loginController as lc'
      })
      .state({
         name: 'dashboard',
         templateUrl: './partials/dashboard.html',
         controller: 'dashboardController as dc',
         children: [
            {
               name: 'main',
               url: '/dashboard',
               templateUrl: './partials/dashboard.home.html'
            },
            {
               name: 'topic',
               url: '/topic/:id',
               templateUrl: './partials/dashboard.topicview.html',
               controller: 'topicController as tc'
            },
            {
               name: 'user',
               url: '/user/:id',
               templateUrl: './partials/dashboard.user.html',
               controller: 'userController as uc'
            }
         ]
      });

      $urlRouterProvider.otherwise('/');
});