'use strict';
const Mongoose = require('mongoose');
const Bcrypt = require('bcrypt');
const Schema = Mongoose.Schema
const ObjectId = Schema.ObjectId
const HashPassword = require("../services/hashPassword.service")

module.exports = {
    schema: {
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updatedAt: {
            type: Date,
            default: Date.now()
        },
        firstname: {
            type: String
        },
        age: {
            type: Number
        }
    },
    statics: {},
    methods: {
        comparePassword: function(candidatePassword, cb) {
            Bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
                if (err) {
                    return cb(err);
                }
                cb(null, isMatch);
            });
        }
    },
    onSchema: {
        pre: {
            save: [
                HashPassword
            ],
            findOneAndUpdate: [
                HashPassword,
                function() {
                    this.update({}, {
                        $set: {
                            updatedAt: new Date()
                        }
                    });
                }
            ]
        },
        post: {}
    }
}