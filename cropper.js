var templates = require('./templates');
var CropperView = require('./lib/cropper-view').extend({
    template: templates.cropper
});
var ImageModel = require('./lib/image-model');

module.exports.createCropper = function (opts) {
    var model = new ImageModel(opts || {});

    var view = new CropperView({
        model: model,
        template: templates.cropper
    });

    view.render();

    return view;
};
