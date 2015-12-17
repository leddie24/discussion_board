discBoard.controller('topicController', function($stateParams, $scope, LoginFactory, TopicFactory) {
   var mv = this;

   mv.curr_user = LoginFactory.getUser();

   TopicFactory.getTopicDetails($stateParams.id, function(data) {
      mv.topicDetails = data;
   });

   mv.index = function() {
      TopicFactory.getTopics(function(data) {
         mv.topics = data;
         console.log(mv.topics);
      });
   }

   mv.addPost = function() {
      console.log($stateParams.id);
      var postInfo = {
         userId: mv.curr_user._id,
         postContent: mv.topicPost.text
      }
      TopicFactory.addPost($stateParams.id, postInfo, function(data) {
         console.log(data);
         mv.topicDetails = data;
         mv.topicPost = {};
      })
   }

   mv.addComment = function(post, comment, index) {
      var info = {
         userId: mv.curr_user._id,
         commentContent: comment,
         topicId: $stateParams.id
      }
      console.log(post._id, info, index);
      mv.postCommentText[index] = "";
      TopicFactory.addComment(post._id, info, function(data) {
         console.log(data);
         mv.topicDetails = data;
         alert('added comment');
      })
   }

   mv.likePost = function(post) {
      var info = {
         post: post,
         topicId: $stateParams.id
      }
      console.log(info);
      TopicFactory.likePost(info, function(data) {
         console.log(data);
         mv.topicDetails = data;
      })
   }

   mv.dislikePost = function(post) {
      var info = {
         post: post,
         topicId: $stateParams.id
      }
      console.log(info);
      TopicFactory.dislikePost(info, function(data) {
         console.log(data);
         mv.topicDetails = data;
      })
   }

   mv.index();
});