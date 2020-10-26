const Articles = require('../models/articleModel')

exports.removeCategoryFromArticles = function (req, res, next) {
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