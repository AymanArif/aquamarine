'use strict';
const Mongoose = require('mongoose');
const Boom = require('boom');
const User = Models.User

module.exports = {
    create: async (request, h) => {
        try {
            const user = await new User(request.payload).save();
            return h.response({
                'success': 'user_created',
                'user': user
            }).code(201);
        } catch (err) {
            throw Boom.badRequest(err);
        }
    },
    remove: async (request, h) => {
        try {
            await User.findOneAndRemove({
                _id: request.params.id
            }).exec();
            return {
                'success': 'user_delete'
            };
        } catch (e) {
            return Boom.badData(err);
        }
    },
    find: async (request, h) => {
        try {
            const query = await User.find({
                _id: request.params.id
            }).exec();
            return query;
        } catch (e) {
            return Boom.badData(err);
        }
    },
    update: async (request, h) => {
        try {
            const result = await User.findOneAndUpdate({
                _id: request.params.id
            }, request.payload, {
                new: true
            }).exec();
            return result;
        } catch (e) {
            return Boom.badRequest(err);
        }
    }
}