var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
   _post: {type: Schema.Types.ObjectId, ref: 'Post'},
   _user: {type: Schema.Types.ObjectId, ref: 'User'},
   content: String,
   postDateTime: {type:Date, default: Date.now},
   likes: {type: Number, default: 0 },
   dislikes: {type: Number, default: 0 },
   _likesUsers: [{type: Schema.Types.ObjectId, ref: 'User'}],
   _dislikesUsers: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

mongoose.model('Comment', CommentSchema);