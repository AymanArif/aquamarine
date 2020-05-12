'use strict';
const Mongoose = require('mongoose');
const Boom = require('boom');
const User = Models.User

module.exports = async (decoded, request) => {
    jwt.verify(request.headers.authorization, Config.get('server.auth.secretKey'), (err, decoded) => {
        if (typeof decoded === 'undefined') {
            return {
                isValid: false
            };
        }
        User.findOne({
            _id: decoded.iduser,
            admin: true
        }).exec((err, currentUser) => {
            if (!currentUser || err) {
                return Boom.badRequest('You must be admin user');
            }
            request.currentUser = currentUser;
            return {
                isValid: true
            };
        });
    });
};