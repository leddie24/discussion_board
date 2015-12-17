discBoard.controller('dashboardController', function($scope, $location, LoginFactory, TopicFactory) {
   var mv = this;

   mv.curr_user = LoginFactory.getUser();

   TopicFactory.getTopicCategories(function(data) {
      console.log(data);
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

   mv.addNewTopic = function() {
      console.log(mv.newTopic);
      mv.newTopic.user = mv.curr_user;
      TopicFactory.addNewTopic(mv.newTopic, function(response) {
         console.log(response);
         if (response.status == 200) {
            mv.newTopic = {};
            mv.index();
         } else {
            console.log('error adding new topic');
         }
      });
   }

   mv.index();
});