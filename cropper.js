var CropperView = require('./cropper-view');
var ImageModel = require('./image-model');
var templates = require('./templates');

module.exports.createCropper = function (opts) {
    var model = new ImageModel(opts || {});

    var view = new CropperView({
        model: model
    });

    view.render();

    return view;
};
