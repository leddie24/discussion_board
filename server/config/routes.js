var loginCtrl = require('../controllers/loginController.js');
var topicCtrl = require('../controllers/topicController.js');
module.exports = function(app) {
   app.post('/login', function (req, res) {
      loginCtrl.loginUser(req, res);
   });


   app.get('/topiclist', function (req, res) {
      topicCtrl.getTopics(req, res);
   })

   app.post('/addtopic', function (req, res) {
      topicCtrl.addTopic(req, res);
   })

   app.get('/topiccategories', function (req, res) {
      topicCtrl.getTopicCategories(req, res);
   })

   app.get('/topicdetails/:id', function (req, res) {
      console.log(req.params, req.body);
      topicCtrl.getTopicDetails(req, res);
   });

   app.post('/addpost/:id', function (req, res) {
      console.log(req.params, req.body);
      topicCtrl.addPost(req, res);
   })

   app.post('/addcomment/:id', function (req, res) {
      topicCtrl.addComment(req, res);
   })

   app.get('/userinfo/:id', function (req, res) {
      loginCtrl.getUser(req, res);
   })

   app.post('/likepost', function (req, res) {
      console.log(req.body);
      topicCtrl.likePost(req, res);
   });

   app.post('/dislikepost', function (req, res) {
      console.log(req.body);
      topicCtrl.dislikePost(req, res);
   });
}