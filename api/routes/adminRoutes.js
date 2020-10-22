const express = require('express')
const Category = require('../models/categoryModel')
const utils = require('../utils')

const router = express.Router()

router.get('/get-categories', (req, res, next) => {
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
        res.status(200).json({
            data: response
        });
    }).catch(error => {
        utils.errorMessage(res, 500, utils.ERROR_MESSAGE, error);
    })
})

module.exports = router