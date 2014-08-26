var BaseView = require('ampersand-view');
var Hammer = require('hammerjs');
var cropImage = require('./crop-image');
var bindTransforms = require('bind-transforms');
var applyStyles = require('./apply-styles');
var bindStyles = require('./bind-styles');

var View = BaseView.extend(bindTransforms).extend({
    initialize: function (opts) {
        var size = opts.size || 300;
        this.model.canvasWidth = this.model.canvasHeight = size;
    },
    events: {
        'mousedown [data-hook~=cropper-image-scale]' : 'onZoomStart',
        'mousemove [data-hook~=cropper-image-scale]' : 'onZoom',
        'change    [data-hook~=cropper-image-scale]' : 'updateScaleFromSlider',
        'dragstart img': 'onDragStart',
        'drag img': 'onDrag',
        'dragstop img': 'onDragStop'
    },
    bindings: {
        'model.src': {
            type: 'attribute',
            name: 'src',
            selector: '[data-hook~=cropper-mask] img'
        },
        'model.minScale': {
            type: 'attribute',
            name: 'min',
            selector: '[data-hook~=cropper-image-scale]'
        },
        'model.maxScale': {
            type: 'attribute',
            name: 'max',
            selector: '[data-hook~=cropper-image-scale]'
        },
        'model.scale': {
            type: 'attribute',
            name: 'value',
            selector: '[data-hook~=cropper-image-scale]'
        },
    },
    onDragStart: function () {
        this.initialDragData = {
            panX: this.model.panX,
            panY: this.model.panY
        };
    },
    onDrag: function (e) {
        this.model.panX = this.initialDragData.panX + e.gesture.deltaX;
        this.model.panY = this.initialDragData.panY + e.gesture.deltaY;
    },
    onDragEnd: function () {
        this.initialDragData = null;
    },
    render: function () {
        this.renderWithTemplate({
            model: this.model
        });
        Hammer(this.el);

        var maskEl = this.queryByHook('cropper-mask');

        bindStyles(this.model, {
            width: ['canvasWidth', function (v) { return v + 'px'; } ],
            height: ['canvasHeight', function (v) { return v + 'px'; }]
        }, maskEl);

        var imgEl = this.query('[data-hook~=cropper-mask] img');

        applyStyles(imgEl, {
            maxWidth: 'none',
            display: 'block',
            position: 'relative',
            transformOrigin: '0 0',
        });

        this.bindTransforms({
              left: 'renderedPanX',
              top: 'renderedPanY',
              scale: 'renderedScale'
        }, imgEl);

        return this;
    },
    getCroppedImage: function () {
        return cropImage(
            this.model.img,
            {
                img: {
                    width: this.model.imgWidth,
                    height: this.model.imgHeight
                },
                mask: {
                    width: this.model.canvasWidth,
                    height: this.model.canvasHeight
                },
                output: {
                    maxWidth: 500,
                    maxHeight: 500
                },
                scale: this.model.renderedScale,
                panX: this.model.renderedPanX,
                panY: this.model.renderedPanY
            }
        );
    },
    onZoomStart: function (e) {
        this.zooming = true;
        document.body.addEventListener('mouseup', function () {
            this.zooming = false;
        }.bind(this));
    },
    onZoom: function (e) {
        if (!this.zooming) return;
        this.updateScaleFromSlider();
    },
    updateScaleFromSlider: function () {
        this.model.scale = parseFloat(this.query('[name=scale]').value);
    },
    props: {
        model: 'state'
    }
});

module.exports = View;
