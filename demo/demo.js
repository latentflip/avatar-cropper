var Cropper = require('../cropper');
window.views = [];

function addCropper(sel, opts) {
    var cropper = Cropper.createCropper(opts);
    document.querySelector(sel).appendChild(cropper.el);
    var button = document.createElement('button');
    button.innerHTML = 'crop';
    button.addEventListener('click', function () {
        var img = document.createElement('img');
        img.src = cropper.getCroppedImage();
        document.body.appendChild(img);
    });
    document.querySelector(sel).appendChild(button);
    views.push(cropper);
    return cropper;
}

var c1 = addCropper('[role=cropper]', { src: '/small-avatar.png', scale: 4.2857 });
var c2 = addCropper('[role=cropper-2]', { src: '/small-avatar.png', scale: 3 });
var c3 = addCropper('[role=cropper-3]', { src: '/big-avatar.png', scale: 3 });

c2.model.panX = -150;
c2.model.panY = -150;
setInterval(function () {
    c2.model.panX += 5;
    if (c2.model.panX > 150) {
        c2.model.panX = -150;
    }
}, 50);

setInterval(function () {
    c2.model.panY += 5;
    if (c2.model.panY > 150) {
        c2.model.panY = -150;
    }
}, 100);

document.querySelector('input[type=file]').addEventListener('change', function (e) {
    var reader = new FileReader();

    reader.onload = function (e) {
        var c4 = addCropper('[role=cropper-4]', { src: e.target.result, scale: 1 });
    }.bind(this);

    reader.readAsDataURL(e.target.files[0]);
});
