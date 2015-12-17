var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Schema = mongoose.Schema;

var TopicSchema = new Schema({
   category: String,
   name: String,
   description: String,
   _user: {type: Schema.Types.ObjectId, ref: 'User'},
   _postsList: [{type: Schema.Types.ObjectId, ref: 'Post'}]
});

mongoose.model('Topic', TopicSchema);
TopicSchema.plugin(deepPopulate);