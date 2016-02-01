discBoard.controller('topicController', function($state, $stateParams, $scope, LoginFactory, TopicFactory) {
   var mv = this;

   mv.curr_user = LoginFactory.getUser();

   // Get topic details on load
   mv.index = function() {
      console.log('indx');
      TopicFactory.getTopicDetails($stateParams.id, function(data) {
         mv.topicDetails = data;

         // If topic is invalid, redirect back to dashboard main
         if (data.status === 400) {
            $state.go('dashboard.main', null, { reload: true });
         }
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
      })
   }

   mv.likeContent = function(content, type) {
      var info = {
         topicId: $stateParams.id,
         currUser: mv.curr_user,
         content: content,
         type: type
      }
      TopicFactory.likeContent(info, function(data) {
         console.log(data);
         mv.topicDetails = data;
      });
   }

   mv.dislikeContent = function(content, type) {
      var info = {
         topicId: $stateParams.id,
         currUser: mv.curr_user,
         content: content,
         type: type
      }
      TopicFactory.dislikeContent(info, function(data) {
         console.log(data);
         mv.topicDetails = data;
      });
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

   mv.likeComment = function(comment) {
      var info = {
         comment: comment,
         topicId: $stateParams.id
      }
      console.log(info);
      TopicFactory.likeComment(info, function(data) {
         console.log(data);
         mv.topicDetails = data;
      })
   }

   mv.dislikeComment = function(comment) {
      var info = {
         comment: comment,
         topicId: $stateParams.id
      }
      TopicFactory.dislikeComment(info, function(data) {
         console.log(data);
         mv.topicDetails = data;
      })
   }

   mv.index();
});