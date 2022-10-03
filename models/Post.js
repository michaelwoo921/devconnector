const mongoose = require('mongoose');

const PostScheme = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    avatar: {
        type: String
    },
    likes: [
        { user: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ],
    comments: [
        {
            user: mongoose.Schema.Types.ObjectId, ref: 'User',
            text: { type: String},
            name: { type: String},
            avatar: { type: String},
            date: { type: Date, default: Date.now},
            
        }
    ],
    date: {
        type: Date, 
        default: Date.now
    }
})

module.exports = Post = mongoose.model('Post', PostSchema)