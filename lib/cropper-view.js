var domthingMixin = require('./domthing-mixin');
var BaseView = require('ampersand-view').extend(domthingMixin);
var Hammer = require('hammerjs');
var cropImage = require('./crop-image');
var bindTransforms = require('bind-transforms');

var View = BaseView.extend(bindTransforms).extend({
    initialize: function (opts) {
        var size = opts.size || 300;
        this.model.canvasWidth = this.model.canvasHeight = size;
    },
    events: {
        'mousedown [name=scale]' : 'onZoomStart',
        'mousemove [name=scale]' : 'onZoom',
        'dragstart img': 'onDragStart',
        'drag img': 'onDrag',
        'dragstop img': 'onDragStop'
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

        var imgEl = this.get('img');
        imgEl.style.display = 'block';
        ['transform-origin', '-webkit-transform-origin', '-moz-transform-origin', '-o-transform-origin', '-ms-transform-origin'].forEach(function (attr) {
            imgEl.style[attr] = '0 0';
        });
        imgEl.style.position = 'relative';

        this.bindTransforms({
              left: 'renderedPanX',
              top: 'renderedPanY',
              scale: 'renderedScale'
        }, this.get('img'));

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
        this.model.scale = parseFloat(this.get('[name=scale]').value);
    },
    props: {
        model: 'state'
    }
});

module.exports = View;
