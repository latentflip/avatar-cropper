module.exports = require('ampersand-state').extend({
    props: {
        src: ['string'],
        scale: ['number', true, 1],
        panX: ['number', true, 0],
        panY: ['number', true, 0],
    },
    session: {
        img: ['any'],
        canvasWidth: ['number', false, 300],
        canvasHeight: ['number', false, 300]
    },
    initialize: function () {
        this.on('change:src', this.updateImage.bind(this));
        this.updateImage();
    },
    derived: {
        imgWidth: {
            deps: ['img'],
            fn: function () { return this.img && this.img.width; },
        },
        imgHeight: {
            deps: ['img'],
            fn: function () { return this.img && this.img.height; },
        },
        actualWidth: {
            deps: ['imgWidth', 'renderedScale'],
            fn: function () { return this.renderedScale * this.imgWidth; }
        },
        actualHeight: {
            deps: ['imgHeight', 'renderedScale'],
            fn: function () { return this.renderedScale * this.imgHeight; }
        },
        renderedScale: {
            deps: ['scale', 'minScale', 'maxScale'],
            fn: function () {
                 if (this.scale < this.minScale) return this.minScale;
                 if (this.scale > this.maxScale) return this.maxScale;
                 return this.scale;
            }
        },
        minScale: {
            deps: ['canvasWidth', 'canvasHeight', 'imgWidth', 'imgHeight'],
            fn: function () {
                return Math.max.apply(Math, [
                    this.canvasWidth/this.imgWidth,
                    this.canvasHeight/this.imgHeight
                ]);
            }
        },
        maxScale: {
            deps: [],
            fn: function () {
                return 5;
            }
        },
        overlapWidth: {
            deps: ['actualWidth', 'canvasWidth'],
            fn: function () {
                return this.actualWidth - this.canvasWidth;
            }
        },
        overlapHeight: {
            deps: ['actualHeight', 'canvasHeight'],
            fn: function () {
                return this.actualHeight - this.canvasHeight;
            }
        },
        maxPan: {
            deps: ['overlapWidth', 'overlapHeight'],
            fn: function () {
                return {
                    left:  -1 * this.overlapWidth,
                    right:  0,
                    top:   -1 * this.overlapHeight,
                    bottom: 0
                };
            }
        },
        renderedPanX: {
            deps: ['overlapWidth', 'panX'],
            fn: function () {
                var renderedPanX = this.panX - this.overlapWidth/2;
                if (renderedPanX < this.maxPan.left) return this.maxPan.left;
                if (renderedPanX > this.maxPan.right) return this.maxPan.right;
                return renderedPanX;
            }
        },
        renderedPanY: {
            deps: ['maxPan', 'panY'],
            fn: function () {
                var renderedPanY = this.panY - this.overlapWidth/2;
                if (renderedPanY < this.maxPan.top) return this.maxPan.top;
                if (renderedPanY > this.maxPan.bottom) return this.maxPan.bottom;
                return renderedPanY;
            }
        },
    },

    updateImage: function () {
        if (!this.src) this.image = undefined;

        var img = new Image();
        img.src = this.src;
        img.onload = function () {
            this.img = img;
        }.bind(this);
    },
});
