const express = require('express');
const utils = require('../utils');
const Categories = require('../models/categoryModel');
const Tags = require('../models/tagModel');

const router = express.Router();

//record no of page visits here
router.get('/getHomePageCommonData', async (req, res, next) => {
    try {
        let categoryData = await Categories.find({ isActive: utils.ActiveStatus.Active });
        let tagData = await Tags.find({ isActive: utils.ActiveStatus.Active });
        let categories = [], tags = [];
        categoryData.forEach(element => {
            categories.push({ value: element._id, text: element.name });
        });
        tagData.forEach(element => {
            tags.push({ value: element._id, text: element.name });
        });
        res.status(200).json({
            categories: categories,
            tags: tags
        });
    } catch (error) {
        utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
    }
})


module.exports = router;