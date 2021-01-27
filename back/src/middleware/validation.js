const bcrypt = require('bcrypt');

module.exports = {
    validateUpdate: async (body) => {
        return new Promise((resolve, reject) => {
            let user = body;
            if (user.name && user.name === "")
                reject('The name must not be empty');
            if (user.name && user.email === "")
                reject('The email must not be empty');

            if (user.password) {
                if (user.password.length < 6) reject('The password must be at least 6 characters');
                bcrypt.genSalt(parseInt(process.env.TOKEN_SECRET), function (e, salt) {
                    if (e) reject(e);

                    bcrypt.hash(user.password, salt, function (e, hash) {
                        if (e) reject(e);
                        user.password = hash;
                        resolve(user);
                    });
                });
            } else {
                resolve(user);
            }
        })
    },

}
