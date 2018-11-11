var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = {
    /**
     * User Login, used as id to connect between all our platforms.
     */
    login: {
        type: 'string',
        //match: /^[a-zA-Z0-9_-]{'+userSchema.login.check.minLength+','+userSchema.login.check.maxLength+'}$/,
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
        type: 'string',
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
        type: 'string',
        required: true,
        check: {
            length: 128
        }
    },

    /**
     * User right
     */
    right: {
        guess: {
            type: "boolean",
            default: false,
            required: true
        },
        moderator: {
            type: "boolean",
            default: false,
            required: true
        }
    }
};

module.exports = mongoose.model('User', userSchema);