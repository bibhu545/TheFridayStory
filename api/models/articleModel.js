const mongoose = require('mongoose')
const slugify = require('slugify')
const utils = require('../utils')

const articleSchema = new mongoose.Schema({
    user: {
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
    readingTime: {  
        type: Number,
        default: 5
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories'
    }],
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tags'
    }],
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


// {
//     "user":"5f9073e57592802e1c6827f1",
//     "title":"The firstever title",
//     "description": "The firstever description",
//     "content": "The firstever content",
//     "readingTime": "5",
//     "categories": ["5f91f004f625000db8bca440"],
//     "tags":[]
// }
