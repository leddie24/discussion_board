var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
   loginUser: function(req, res) {
      console.log(req.body);
      User.findOne({ name: req.body.name }, function(err, user){
         if(user){
            console.log('found user?', user);
            res.json(user);
         }
         else if(!user){
            var newUser = new User({ name: req.body.name });
            newUser.save(function(err){
               if(err){
                  console.log(err);
                  res.json(err);
               }else{
                  console.log('Added new user', newUser);
                  res.json(newUser);
               }
            })
         }
      })
   },
   getUser: function(req, res) {
      console.log('hello', req.params);
      User.findById(req.params.id, function(err, user) {
         if (err) {
            console.log(err, 'error getting user');
         } else {
            res.json(user);
         }
      })
   }
}