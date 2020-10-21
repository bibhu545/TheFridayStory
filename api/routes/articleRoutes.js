const express = require('express')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const Articles = require('../models/articleModel')
const utils = require('../utils')

const dompurify = createDomPurify(new JSDOM().window)
const router = express.Router()

router.get('/', (req, res, next) => {
    Articles.find({ isActive: utils.ArticleStatus.Active }).sort({ createdAt: -1 }).populate('userId', 'firstName lastName email').then(response => {
        res.status(200).json({
            data: response
        });
    }).catch(err => {
        utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
    })
})

router.get('/:id', (req, res, next) => {
    Articles.findOne({ _id: req.params.id, isActive: utils.ArticleStatus.Active }).populate('userId', 'firstName lastName email').then(response => {
        if (!response) {
            res.status(404).json({
                message: "Resourse not found"
            });
        }
        else {
            res.status(200).json({
                data: response
            });
        }
    }).catch(err => {
        utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
    })
})

router.post('/', (req, res, next) => {
    let articleData = {
        userId: req.body.userId,
        title: req.body.title,
        description: req.body.description,
        content: dompurify.sanitize(req.body.content)
    }
    Articles.create(articleData).then(response => {
        Articles.findOne({ _id: response._id }).populate('userId', 'firstName lastName email').exec().then(result => {
            res.status(201).json({
                data: result
            });
        }).catch(err => {
            utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
        })
    }).catch(err => {
        utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
    })
})

router.put('/:id', (req, res, next) => {
    let newArticleData = {
        title: req.body.title,
        description: req.body.description,
        content: dompurify.sanitize(req.body.content)
    }
    Articles.findById({ _id: req.params.id }).then(oldData => {
        if (!oldData) {
            res.status(404).json({
                message: "Resourse not found"
            });
        }
        else {
            oldData.title = newArticleData.title;
            oldData.description = newArticleData.description;
            oldData.content = newArticleData.content;
            oldData.save().then(updatedData => {
                Articles.findOne({ _id: updatedData._id }).populate('userId', 'firstName lastName email').exec().then(result => {
                    res.status(200).json({
                        data: result
                    });
                }).catch(err => {
                    utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
                })
            }).catch(err => {
                utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
            })
        }
    }).catch(err => {
        utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
    })
})

router.delete('/:id', (req, res, next) => {
    Articles.findById({ _id: req.params.id }).then(oldData => {
        if (!oldData) {
            res.status(404).json({
                message: "Resourse not found"
            });
        }
        else {
            oldData.isActive = utils.ArticleStatus.Deleted
            oldData.save().then(updatedData => {
                res.status(200).json({
                    data: updatedData
                });
            }).catch(err => {
                utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
            })
        }
    }).catch(err => {
        utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
    })
})

module.exports = router