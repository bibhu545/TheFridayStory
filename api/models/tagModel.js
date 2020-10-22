const mongoose = require('mongoose')

const tagSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    addedOn: {
        type: Date,
        default: new Date()
    },
    lastUpdatedOn: {
        type: Date,
        default: new Date()
    },
    isActive: {
        type: Number,
        default: utils.ActiveStatus.Active
    }
})

module.exports = mongoose.model('Tags', tagSchema)