/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 14-1-18
 * Time: 上午11:37
 * To change this template use File | Settings | File Templates.
 */

var Photo = require('../models/Photo'),
    path = require('path'),
    fs = require('fs'),
    join = path.join;
/**
 * show photos
 * @param req
 * @param res
 */
exports.list = function (req, res, next) {
    Photo.find({}, function (err, photos) {
        if (err) return next(err);
        res.render('photos', {
            title: 'Photos',
            photos: photos
        });
    });
};

exports.form = function (req, res) {
    res.render('photos/upload', {
        title: 'Photo upload'
    });
};

exports.submit = function (dir) {
    return function (req, res, next) {
        var img = req.files.photo.image,
            name = req.body.photo.name || img.name,
            path = join(dir, img.name),
            is = fs.createReadStream(img.path),
            os = fs.createWriteStream(path);

        is.pipe(os);
        is.on('end', function (err) {
            fs.unlinkSync(img.path);
            if (err) return next(err);
            Photo.create({
                name: name,
                path: img.name
            }, function (err) {
                if (err) return next(err);
                res.redirect('/');
            });
        });
    };
};

exports.download = function (dir) {
    return function (req, res, next) {
        var id = req.params.id;

        Photo.findById(id, function (err, photo) {
            if (err) return next(err);

            var path = join(dir, photo.path);
            res.download(path, photo.name + '.jpeg');
        });
    };
};