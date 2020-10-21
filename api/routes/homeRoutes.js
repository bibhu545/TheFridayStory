const express = require('express');
const Article = require('../models/articleModel')

const router = express.Router();

router.get('/', (req, res) => {
    Article.find().sort({ createdAt: 'desc' }).then(articles => {
        res.send(articles)
    }).catch(error => {
        res.send("Please reload the page...");
    });
})


module.exports = router;