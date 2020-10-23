const express = require('express')
const Category = require('../models/categoryModel')
const Articles = require('../models/articleModel')
const utils = require('../utils')

const router = express.Router()

router.get('/get-category', (req, res, next) => {
    Category.find({ isActive: utils.ActiveStatus.Active }).sort({ name: 1 }).exec().then(response => {
        res.status(200).json({
            data: response
        });
    }).catch(error => {
        utils.errorMessage(res, 500, utils.ERROR_MESSAGE, error);
    })
})

router.post('/add-category', (req, res, next) => {
    let categoryData = {
        name: req.body.name
    }
    Category.create(categoryData).then(response => {
        res.status(201).json({
            data: response,
            message: 'New category added'
        });
    }).catch(error => {
        utils.errorMessage(res, 500, utils.ERROR_MESSAGE, error);
    })
})

router.post('/edit-category/:id', (req, res, next) => {
    Category.findOneAndUpdate({ _id: req.params.id }, { $set: { name: req.body.name } }).exec().then(response => {
        res.status(200).json({
            data: response
        });
    }).catch(error => {
        utils.errorMessage(res, 500, utils.ERROR_MESSAGE, error);
    })
})

router.post('/delete-category/:id', (req, res, next) => {
    Category.findOneAndUpdate({ _id: req.params.id }, { $set: { ActiveStatus: utils.ActiveStatus.Deleted } }).exec().then(response => {
        next();
    }).catch(error => {
        utils.errorMessage(res, 500, utils.ERROR_MESSAGE, error);
    })
}, removeCategoryFromArticles)

module.exports = router

function removeCategoryFromArticles(req, res, next) {
    Articles.find({ categories: req.params.id }).then(response => {
        var update = function (element, index) {
            element.categories.splice(element.categories.findIndex(item => item == req.params.id), 1);
            return Articles.updateOne({ _id: element._id }, { $set: { categories: element.categories } }).exec();
        };
        var results = Promise.all(response.map(update));
        results.then(data => {
            res.status(200).json({
                data: response
            });
        }).catch(error => {
            utils.errorMessage(res, 500, utils.ERROR_MESSAGE, error);
        });
    }).catch(error => {
        utils.errorMessage(res, 500, utils.ERROR_MESSAGE, error);
    })
}