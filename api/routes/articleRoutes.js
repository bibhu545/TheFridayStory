const express = require('express')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const Articles = require('../models/articleModel')
const utils = require('../utils')
const articleMiddlewares = require('../middlewares/articleMiddlewares')
const checkAuth = require('../middlewares/routeGuard')

const dompurify = createDomPurify(new JSDOM().window)
const router = express.Router()

router.get('/', (req, res, next) => {
    Articles.find().sort({ createdAt: -1 }).populate('user', 'firstName lastName email').populate('categories').populate('tags').then(response => {
        res.status(200).json({
            data: response
        });
    }).catch(err => {
        utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
    })
})

router.get('/:id', (req, res, next) => {
    Articles.findOne({ _id: req.params.id, isActive: utils.ActiveStatus.Active }).populate('userId', 'firstName lastName email').then(response => {
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

router.post('/', checkAuth, articleMiddlewares.addNewTags, (req, res, next) => {
    let articleData = {
        user: req.body.user,
        title: req.body.title,
        description: req.body.description,
        readingTime: req.body.readingTime,
        categories: req.body.categories,
        tags: req.tags,
        content: dompurify.sanitize(req.body.content)
    }
    Articles.create(articleData).then(response => {
        req.articleId = response._id;
        next();
    }).catch(err => {
        utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
    })
}, articleMiddlewares.saveArticleImage)

router.put('/:id', checkAuth, articleMiddlewares.addNewTags, (req, res, next) => {
    let newArticleData = {
        title: req.body.title,
        description: req.body.description,
        categories: req.body.categories,
        tags: req.tags,
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
            oldData.tags = newArticleData.tags;
            oldData.categories = newArticleData.categories;
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

router.delete('/:id', checkAuth, (req, res, next) => {
    Articles.findById({ _id: req.params.id }).then(oldData => {
        if (!oldData) {
            res.status(404).json({
                message: "Resourse not found"
            });
        }
        else {
            oldData.isActive = utils.ActiveStatus.Deleted
            oldData.save().then(updatedData => {
                next();
            }).catch(err => {
                utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
            })
        }
    }).catch(err => {
        utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
    })
}, articleMiddlewares.deleteComments)

module.exports = router