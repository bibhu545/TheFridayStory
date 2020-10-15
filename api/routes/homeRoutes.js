const express = require('express');
const mongoose = require('mongoose');
const Article = require('../models/articleModel')


const router = express.Router();
mongoose.connect('mongodb+srv://blogUser:blogPassword@testcluster.eik60.mongodb.net/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

router.get('/', (req, res) => {
    Article.find().sort({ createdAt: 'desc' }).then(articles => {
        res.send(articles)
    }).catch(error => {
        res.send("Please reload the page...");
    });
})


module.exports = router;