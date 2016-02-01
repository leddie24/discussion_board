discBoard.factory('TopicFactory', function($http) {
   var factory = {};

   factory.getTopics = function(callback) {
      $http.get('/topiclist')
      .then(function(response){
         callback(response.data);
      })
      .catch(function(response) {
         console.log(response, "error getting topics");
      })
   }

   factory.getTopicCategories = function(callback) {
      $http.get('/topiccategories')
      .then(function(response){
         callback(response.data);
      })
      .catch(function(response) {
         console.log(response, "Error getting topic cats");
      });
   }

   factory.getTopicDetails = function(topic, callback) {
      $http.get('/topicdetails/' + topic)
      .then(function(response) {
         callback(response.data);
         console.log(response.data, 'got topic')
      })
      .catch(function(response) {
         console.log(response, 'error');
      });
   }

   factory.addNewTopic = function(topic, callback) {
      $http.post('/addtopic', topic)
      .then(function(response) {
         console.log(response);
         callback(response);
      },
      function(response) {
         console.log(response);
         callback(response);
      });
   }

   factory.addPost = function(topicid, postInfo, callback) {
      console.log(postInfo);
      $http.post('/addpost/' + topicid, postInfo).
      then(function (response) {
         callback(response.data);
      })
      .catch(function (response) {

      });
   }

   factory.addComment = function(postid, info, callback) {
      console.log(postid, info);
      $http.post('/addcomment/' + postid, info)
      .then(function (response) {
         callback(response.data);
      })
      .catch(function (response) {
         console.log(response, "error adding comment");
      });
   }

   factory.likeTopic = function(info, callback) {
      $http.post('/liketopic', info)
      .then(function (response) {
         callback(response.data);
      })
      .catch(function (response) {
         console.log(response, 'error liking topic');
      })
   }

   factory.likePost = function(info, callback) {
      $http.post('/likepost', info)
      .then(function (response) {
         callback(response.data);
      })
      .catch(function (response) {
         console.log(response, 'error liking post');
      })
   }

   factory.dislikePost = function(info, callback) {
      $http.post('/dislikepost', info)
      .then(function (response) {
         callback(response.data);
      })
      .catch(function (response) {
         console.log(response, 'error liking post');
      })
   }

   return factory;
});