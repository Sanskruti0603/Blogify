const mongoose = require('mongoose');
const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'blog' //modelname  referenec to blog table
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user' //modelname
    },
},{timestamps:true});

const Comment=mongoose.model('comment',commentSchema);
module.exports = Comment;