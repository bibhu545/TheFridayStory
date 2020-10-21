const mongoose = require('mongoose')
const slugify = require('slugify')
const utils = require('../utils')

const articleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    lastUpdatedAt: {
        type: Date,
        default: new Date()
    },
    isActive: {
        type: Number,
        default: utils.ActiveStatus.Active
    }
})

articleSchema.pre('validate', function (next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }
    next()
})

module.exports = mongoose.model('Article', articleSchema) 