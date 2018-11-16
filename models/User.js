var mongoose = require('mongoose');
const { Schema } = mongoose;

var userSchema = new Schema({
    /**
     * User Login, used as id to connect between all our platforms.
     */
    login: {
        type: String,
        trim: true,
        required: true,
        notEmpty: true,
        unique: true,
        check: {
            minLength: 4,
            maxLength: 16
        }
    },

    /**
     * User email.
     */
    email: {
        type: String,
        lowercase: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        required: true,
        notEmpty: true,
        unique: true,
        check: {
            minLength: 6,
            maxLength: 30
        }
    },

    /**
     * User private password, the one hashed in SHA512 and stored on the database.
     */
    password: {
        type: String,
        required: true,
        check: {
            length: 128
        }
    },

    /**
     * User right
     */
    right: {
        guest: {
            type: Boolean,
            default: false,
            required: true
        },
        moderator: {
            type: Boolean,
            default: false,
            required: true
        }
    },

    /**
     * movie qualifications
     */
    scores: [{ movie: { type: Schema.Types.ObjectId, ref: 'Movie' }, score: { type: Number } }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);