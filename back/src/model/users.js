const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 80,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: [isEmail, 'Invalid email!'],
        minlength: 6,
        maxlength: 80,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20,
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});

UserSchema.index({ email: 1 }, { unique: true });

UserSchema.pre('save', function (next) {
    let user = this;

    // generate a salt
    bcrypt.genSalt(parseInt(process.env.TOKEN_SECRET), function (e, salt) {
        if (e) return next(e);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (e, hash) {
            if (e) return next(e);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

// UserSchema.pre('findOneAndUpdate', async function (next) {
//     let updateObject = this._update, users = await this.model.findOne(this.getQuery());
//     if (updateObject.name === "" && updateObject.name)
//         return next(new Error('The name must not be empty'));
//     if (updateObject.email === "" && updateObject.email)
//         return next(new Error('The email must not be empty'));
//
//     // generate a salt
//     if (updateObject.password) {
//         if (updateObject.password.length < 6) return next(new Error('The password must be at least 6 characters'));
//         bcrypt.genSalt(parseInt(process.env.TOKEN_SECRET), function (e, salt) {
//             if (e) return next(e);
//
//             // hash the password using our new salt
//             bcrypt.hash(updateObject.password, salt, function (e, hash) {
//                 if (e) return next(e);
//                 // override the cleartext password with the hashed one
//                 users.password = hash;
//                 console.log(users);
//                 next(users);
//             });
//         });
//     } else {
//         // console.log(users);
//         return next();
//     }
// });

module.exports = mongoose.model('Users', UserSchema);