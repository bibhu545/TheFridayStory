const Articles = require('../models/articleModel')
const Tags = require('../models/tagModel')
const Comments = require('../models/commentModel')

exports.addNewTags = function(req, res, next) {
    var reqTags = req.body.tags;
    if (!reqTags) {
        req.tags = [];
        next();
    }
    else {
        Tags.find().then(tags => {
            let newTags = [], oldTags = [];
            reqTags.forEach(element => {
                if (!tags.find(item => item.name == element)) {
                    newTags.push({ name: element.name, user: req.body.user });
                }
                else {
                    oldTags.push(element.id);
                }
            });
            Tags.insertMany(newTags).then(response => {
                let tagObjects = [...oldTags, ...response.map(item => item._id)];
                let tagIds = [];
                tagObjects.forEach(element => {
                    tagIds.push(element);
                });
                console.log(tagIds)
                req.tags = tagIds;
                next();
            }).catch(error => {
                utils.errorMessage(res, 500, utils.ERROR_MESSAGE, error);
            });
        }).catch(error => {
            utils.errorMessage(res, 500, utils.ERROR_MESSAGE, error);
        });
    }
}

exports.deleteComments = function(req, res, next) {
    Comments.updateMany({ article: req.params.id }, { $set: { isActive: utils.ActiveStatus.Deleted } }).then(response => {
        res.status(200).json({
            message: "Article deleted",
            data: response
        });
    }).catch(error => {
        utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
    })
}

exports.saveArticleImage = function(req, res, next) {
    const image = req.files.articleImage
    const articleId = req.articleId
    const path = `./api/uploads/${req.articleId}/${image.name}`
    image.mv(path, (error) => {
        if (error) {
            utils.errorMessage(res, 500, "Post created, but image not uploaded.Please try updating the post in edit section.", error);
        }
        else {
            Articles.findOneAndUpdate({ _id: articleId }, { $set: { articleImage: image.name } }).then(response => {
                Articles.findOne({ _id: response._id }).populate('user', 'firstName lastName email').populate('categories').populate('tags').then(result => {
                    res.status(201).json({
                        data: result
                    });
                }).catch(error => {
                    utils.errorMessage(res, 500, "Post created, but image not uploaded.Please try updating the post in edit section.", error);
                })
            }).catch(error => {
                utils.errorMessage(res, 500, "Post created, but image not uploaded.Please try updating the post in edit section.", error);
            })
        }
    })
}