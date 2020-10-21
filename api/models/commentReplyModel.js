const mongoose = require('mongoose')
const utils = require('../utils')

const commentReplySchema = mongoose.Schema({
    comment:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    reply: {
        type: String,
        required: true
    },
    repliedOn: {
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

module.exports = mongoose.model('CommentReplys', commentReplySchema)