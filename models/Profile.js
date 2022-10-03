const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    status: {
        type: String,
        required: true
    },
    company: {
        type: String
    },
    location: {
        type: String
    },
    skills: {
        type: [String],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});


module.exports = Profile = mongoose.model('Profile', ProfileSchema);