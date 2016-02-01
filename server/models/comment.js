var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
   _post: {type: Schema.Types.ObjectId, ref: 'Post'},
   _user: {type: Schema.Types.ObjectId, ref: 'User'},
   content: String,
   postDateTime: {type:Date, default: Date.now},
});

mongoose.model('Comment', CommentSchema);