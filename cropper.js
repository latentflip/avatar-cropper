var CropperView = require('./lib/cropper-view');
var ImageModel = require('./lib/image-model');
var templates = require('./templates');


function Cropper (opts) {
    var model = new ImageModel(opts || {});
    var ViewClass = CropperView.extend({
        template: opts.template || templates.cropper
    });

    var view = new ViewClass({
        model: model,
    });

    view.render();

    return view;
}

Cropper.createCropper = function (opts) {
    return new Cropper(opts);
};

module.exports = Cropper;
