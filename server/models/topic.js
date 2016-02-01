var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Schema = mongoose.Schema;

var TopicSchema = new Schema({
   category: String,
   name: String,
   description: String,
   postDateTime: {type:Date, default: new Date},
   likes: {type: Number, default: 0 },
   dislikes: {type: Number, default: 0 },
   _likesUsers: [{type: Schema.Types.ObjectId, ref: 'User'}],
   _dislikesUsers: [{type: Schema.Types.ObjectId, ref: 'User'}],
   _user: {type: Schema.Types.ObjectId, ref: 'User'},
   _postsList: [{type: Schema.Types.ObjectId, ref: 'Post'}]
});

mongoose.model('Topic', TopicSchema);
TopicSchema.plugin(deepPopulate);