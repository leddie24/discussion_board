discBoard.controller('dashboardController', function($scope, $state, $location, LoginFactory, TopicFactory) {
   var mv = this;

   mv.curr_user = LoginFactory.getUser();
   mv.showModal = false;

   // Boot user back to login screen if there is no user
   if (mv.curr_user === null || mv.curr_user === undefined) {
      $state.go('login', null, { reload: true });
   } else {
      console.log(mv.curr_user);
   }

   TopicFactory.getTopicCategories(function(data) {
      mv.topicCats = data;
   });

   mv.index = function() {
      TopicFactory.getTopics(function(data) {
         mv.topics = data;
         console.log(mv.topics);
      })
   }

   mv.logOutUser = function() {
      console.log('logging out');
      LoginFactory.logOutUser();
      if (!LoginFactory.getUser()) {
         $location.url('/');
      }
   }

   mv.showNewTopicForm = function() {
      mv.showModal = !mv.showModal;
   }

   mv.addNewTopic = function() {
      console.log(mv.newTopic);
      mv.newTopic.user = mv.curr_user;
      TopicFactory.addNewTopic(mv.newTopic, function(response) {
         console.log(response);
         if (response.status == 200) {
            mv.newTopic = {};
            mv.showModal = !mv.showModal;
            mv.index();
         } else {
            console.log('error adding new topic');
         }
      });
   }

   mv.index();
});