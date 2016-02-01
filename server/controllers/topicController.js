var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Topic = mongoose.model('Topic');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');

function getTypeAndID(info) {
   var Query;
   var id;
   if (info.type == 'post') {
      Query = Post;
      id = info.content._id;
   } else if (info.type == 'comment') {
      Query = Comment;
      id = info.content._id;
   } else {
      Query = Topic;
      id = info.topicId;
   }
   return {
      Query: Query,
      id: id
   }
}

module.exports = {
   getTopics: function(req, res) {
      Topic.find({}).deepPopulate(['_user', '_postsList']).exec(function (err, topics) {
         if (err) {
            console.log('error getting topics', err);
         } else {
            res.json(topics);
         }
      })
   },
   addTopic: function(req, res) {
      console.log(req.body); 

      var date = new Date();
      var topic = new Topic({
         category: req.body.category.name,
         name: req.body.title,
         description: req.body.description,
         postDateTime: date,
         _user: req.body.user._id
      });
      topic.save(function(err) {
         if (err) {
            console.log('Error adding topic', err);
            res.status(400).json(err);
         } else {
            User.findByIdAndUpdate(req.body.user._id, {$push: {_topics: topic}}, function (err, user) {
               if (err) {
                  console.log(err);
               } else {
                  console.log('Added new topic', topic, user);
                  res.status(200).send('Added new topic');
               }
            });
         }
      });
   },
   getTopicDetails: function(req, res) {
      if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
         Topic.findById(req.params.id)
         .deepPopulate(['_user', '_postsList._user', '_postsList._comments._user'])
         .exec(function (err, topic) {
            if (err) {
               console.log(err);
            } else {
               res.json(topic);
            }
         });
      } else {
         res.status(400).send('Not valid ID');
      }
   },
   addPost: function(req, res) {
      var post = new Post({
         _user: req.body.userId,
         content: req.body.postContent,
         _topic: req.params.id
      });
      post.save(function(err) {
         if (err) {
            console.log('Error adding post', err);
         } else {
            console.log("Added new post", post);
            Topic.findByIdAndUpdate(req.params.id, {$push: {_postsList: post}}, {new: true})
            .deepPopulate(['_user', '_postsList._user', '_postsList._comments._user'])
            .exec(function (err, topic) {
               if (err) {
                  console.log(err);
               } else {
                  console.log('added new post to this topic', topic);
                  User.findByIdAndUpdate(req.body.userId, {$push: {_postsList: post}}, function (err, user) {
                     if (err) {
                        console.log(err);
                     } else {
                        res.json(topic);
                     }
                  });
               }
            });
         }
      })
   },
   addComment: function(req, res) {
      var comment = new Comment({
         _post: req.params.id,
         _user: req.body.userId,
         content: req.body.commentContent
      });

      comment.save(function(err) {
         if (err) {
            console.log("Error adding comment", err);
         } else {
            Post.findByIdAndUpdate(req.params.id, {$push: {_comments: comment}}, {new: true}, function (err, post) {
               if (err) {
                  console.log(err);
               } else {
                  User.findByIdAndUpdate(req.body.userId, {$push: {_comments: comment}}, function (err, user) {
                     if (err) {
                        console.log(err);
                     } else {
                        console.log('added comment to user and post', user, post, comment);
                        Topic.findById(req.body.topicId)
                        .deepPopulate(['_user', '_postsList._user', '_postsList._comments._user'])
                        .exec(function (err, topic) {
                           if (err) {
                              console.log(err);
                           } else {
                              res.json(topic);
                           }
                        });
                     }
                  });
               }
            })
         }
      })
   },
   likeContent: function(req, res) {
      var info = getTypeAndID(req.body);
      info.Query.findById(info.id)
      .exec(function (err, data) {
         if (err) {
            console.log(err);
         } else {
            // If user hasn't liked content already, like content
            if (data._likesUsers.indexOf(req.body.currUser._id) === -1) {
               info.Query.findByIdAndUpdate(info.id,
               {
                  $inc: {
                     likes: 1
                  },
                  $push: {
                     _likesUsers: req.body.currUser._id
                  }
               }, {new: true}, function (err, topic) {
                  if (err) {
                     console.log(err);
                  } else {
                     Topic.findById(req.body.topicId)
                     .deepPopulate(['_user', '_postsList._user', '_postsList._comments._user'])
                     .exec(function (err, topic) {
                        if (err) {
                           console.log(err);
                        } else {
                           res.json(topic);
                        }
                     });
                  }
               });
            } else {
               // User already liked content, decrease like by 1 to cancel
               info.Query.findByIdAndUpdate(info.id,
               { 
                  $inc: {
                     likes: -1
                  },
                  $pull: {
                     _likesUsers: req.body.currUser._id
                  }
               }, {new: true}, function (err, topic) {
                  if (err) {
                     console.log(err);
                  } else {
                     Topic.findById(req.body.topicId)
                     .deepPopulate(['_user', '_postsList._user', '_postsList._comments._user'])
                     .exec(function (err, topic) {
                        if (err) {
                           console.log(err);
                        } else {
                           res.json(topic);
                        }
                     });
                  }
               });
            }
         }
      });
   },
   dislikeContent: function(req, res) {
      var info = getTypeAndID(req.body);
      info.Query.findById(info.id)
      .exec(function (err, data) {
         if (err) {
            console.log(err);
         } else {
            // If user hasn't disliked content already, dislike content
            if (data._dislikesUsers.indexOf(req.body.currUser._id) === -1) {
               info.Query.findByIdAndUpdate(info.id,
               {
                  $inc: {
                     dislikes: 1
                  },
                  $push: {
                     _dislikesUsers: req.body.currUser._id
                  }
               }, {new: true}, function (err, topic) {
                  if (err) {
                     console.log(err);
                  } else {
                     Topic.findById(req.body.topicId)
                     .deepPopulate(['_user', '_postsList._user', '_postsList._comments._user'])
                     .exec(function (err, topic) {
                        if (err) {
                           console.log(err);
                        } else {
                           res.json(topic);
                        }
                     });
                  }
               });
            } else {
               // User already disliked content, decrease dislike by 1 to cancel
               info.Query.findByIdAndUpdate(info.id,
               { 
                  $inc: {
                     dislikes: -1
                  },
                  $pull: {
                     _dislikesUsers: req.body.currUser._id
                  }
               }, {new: true}, function (err, topic) {
                  if (err) {
                     console.log(err);
                  } else {
                     Topic.findById(req.body.topicId)
                     .deepPopulate(['_user', '_postsList._user', '_postsList._comments._user'])
                     .exec(function (err, topic) {
                        if (err) {
                           console.log(err);
                        } else {
                           res.json(topic);
                        }
                     });
                  }
               });
            }
         }
      });
   },
   getTopicCategories: function(req, res) {
      var topics = [
      {
         name: "Ruby on Rails",
      },
      {
         name: "MySQL"
      },
      {
         name: "UX"
      },
      {
         name: "Web Development"
      },
      {
         name: "HTML"
      },
      {
         name: "CSS"
      }]
      res.json(topics);
   }
}