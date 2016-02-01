var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
   _user: {type: Schema.Types.ObjectId, ref: 'User'},
   content: String,
   postDateTime: {type:Date, default: Date.now},
   _topic: {type: Schema.Types.ObjectId, ref: 'Topic'},
   _comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
   likes: {type: Number, default: 0 },
   dislikes: {type: Number, default: 0 },
   _likesUsers: [{type: Schema.Types.ObjectId, ref: 'User'}],
   _dislikesUsers: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

mongoose.model('Post', PostSchema);