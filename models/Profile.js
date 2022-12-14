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
    bio: {
        type: String
    },
    education: [
        {
            school: { type: String, required: true},
            degree: { type: String, required: true},
            fieldofstudy: { type: String, required: true},
            from: {type:Date, required: true},
            to: {type:Date},
            current: {type: Boolean, default: false},
            description: {type: String}
        },
    ],
    experience: [
        {
            company: { type: String, required: true},
            title: { type: String, required: true},
            location: { type: String },
            from: { type: Date, required: true },
            to: { type: Date },
            current: { type: Boolean, default: false },
            description: { type: String },
        }
    ],
    social: {
        youtube: { type: String },
        twitter: { type: String },
        facebook: { type: String },
        linkedin: { type: String },
        instagram: { type: String },
    },

    githubusername: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }

});


module.exports = Profile = mongoose.model('Profile', ProfileSchema);