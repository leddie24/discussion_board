var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
   _user: {type: Schema.Types.ObjectId, ref: 'User'},
   content: String,
   _topic: {type: Schema.Types.ObjectId, ref: 'Topic'},
   _comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
   likes: {type: Number, default: 0 },
   dislikes: {type: Number, default: 0 }
});

mongoose.model('Post', PostSchema);