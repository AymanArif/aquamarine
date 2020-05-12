'use strict';
const Bcrypt = require('bcrypt');
const Config = require('config');

module.exports = function(next) {
    let user = (this.op === 'update') ? this._update.$set : this;
    if (!user || !user.password || user.password.length === 60) {
        return next();
    }
    Bcrypt.genSalt(Config.get('server.auth.saltFactor'), (err, salt) => {
        if (err) {
            return next(err);
        }
        Bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
};