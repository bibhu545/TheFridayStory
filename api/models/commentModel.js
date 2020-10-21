const mongoose = require('mongoose')
const utils = require('../utils')

const commentSchema = mongoose.Schema({
    article:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Articles',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    commentedOn: {
        type: Date,
        required: true,
        default: new Date()
    },
    lastUpdated: {
        type: Date,
        default: new Date()
    },
    isActive: {
        type: Number,
        required: true,
        default: utils.ActiveStatus.Active
    }
})

module.exports = mongoose.model('Comments', commentSchema)