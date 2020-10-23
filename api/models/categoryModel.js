const mongoose = require('mongoose')
const utils = require('../utils')

const categorySchema = mongoose.Schema({
    name: {
        required: true,
        type: String
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

// categorySchema.pre('remove', function(next) {
//     // Remove all the assignment docs that reference the removed person.
//     this.model('Assignment').remove({ person: this._id }, next);
// });

module.exports = mongoose.model('Categories', categorySchema)