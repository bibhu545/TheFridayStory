const express = require('express')
const Comments = require('../models/commentModel')
const utils = require('../utils')

const router = express.Router()

router.get('/:id', (req, res, next) => {
    Comments.find({ article: req.params.id, isActive: utils.ActiveStatus.Active }).then(response => {
        res.status(200).json({
            data: response
        })
    }).catch(error => {
        utils.errorMessage(res, 500, utils.ERROR_MESSAGE, error);
    })
})

router.post('/', (req, res, next) => {
    let commentData = {
        article: "",
        user: "",
        commentBody: ""
    }
    if (req.body.comment) {
        commentData.comment = req.body.comment
    }
    Comments.create(commentData).then(response => {
        res.status(201).json({
            message: "Comment saved",
            data: response
        })
    }).then(error => {
        utils.errorMessage(res, 500, utils.ERROR_MESSAGE, error);
    })
})

router.put('/:id', (req, res, next) => {
    let commentData = {
        commentBody: req.body.commentBody,
        lastUpdated: new Date()
    }
    Comments.findByIdAndUpdate(req.params.id, { $set: commentData }).then(response => {
        res.status(200).json({
            message: "Comment updated",
            data: response
        })
    }).catch(error => {
        utils.errorMessage(res, 500, utils.ERROR_MESSAGE, error);
    })
})

router.delete('/:id', (req, res, next) => {
    Category.findOneAndUpdate({ $or: [{ _id: req.params.id }, { comment: req.params.id }] }, { $set: { ActiveStatus: utils.ActiveStatus.Deleted } }).exec().then(response => {
        res.status(200).json({
            message: "Comment deleted"
        })
    }).catch(error => {
        utils.errorMessage(res, 500, utils.ERROR_MESSAGE, error);
    })
})

module.exports = router