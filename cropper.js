var templates = require('./templates');
var CropperView = require('./lib/cropper-view').extend({
    template: templates.cropper
});
var ImageModel = require('./lib/image-model');

function Cropper (opts) {
    var model = new ImageModel(opts || {});

    var view = new CropperView({
        model: model,
        template: templates.cropper
    });

    view.render();

    return view;
}

Cropper.createCropper = function (opts) {
    return new Cropper(opts);
}

module.exports = Cropper;
