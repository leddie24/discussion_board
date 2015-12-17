var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Schema = mongoose.Schema;

var UserSchema = new Schema({
   name: {type: String, required: true, minlength: 4, maxlength: 20 },
   _topics: [{type: Schema.Types.ObjectId, ref: 'Topic'}],
   _postsList: [{type: Schema.Types.ObjectId, ref: 'Post'}],
   _comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

mongoose.model('User', UserSchema);
UserSchema.plugin(deepPopulate);