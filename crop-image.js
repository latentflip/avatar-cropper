function crop (image, options) {
    var canvas = document.createElement('canvas');
    document.body.appendChild(canvas);

    var data = crop._getCropData(options);

    canvas.width = data.dest.width;
    canvas.height = data.dest.height;
    canvas.style.display = 'none';

    var ctx = canvas.getContext('2d');
    ctx.drawImage(
        image,
        data.src.x, data.src.y, data.src.width, data.src.height,
        data.dest.x, data.dest.y, data.dest.width, data.dest.height
    );

    return canvas.toDataURL('image/jpg');
}

crop._getCropData = function (inp) {
    var relScaleWidth = (inp.mask.width / inp.img.width) / inp.scale;
    var relScaleHeight = (inp.mask.height / inp.img.height) / inp.scale;

    var cropWidth = relScaleWidth * inp.img.width;
    var cropHeight = relScaleHeight * inp.img.height;

    var source = {
        x: -1*inp.panX / inp.scale,
        y: -1*inp.panY / inp.scale,
        width: cropWidth,
        height: cropHeight
    };

    var dest = {
        x: 0,
        y: 0,
        width: source.width,
        height: source.height
    };

    console.log(source, dest);
    return {
        src: source,
        dest: dest
    };
};

module.exports = crop;
