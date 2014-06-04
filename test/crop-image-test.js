//This is so gross

var test = require('tape');
var crop = require('../lib/crop-image');

var cropData = crop._getCropData;

var makeData = function () {
    return {
        img: {
            width: 500,
            height: 500
        },
        mask: {
            width: 100,
            height: 100
        },
        scale: 1,
        panX: 0,
        panY: 0
    };
};

test('1:1', function (t) {
    var input = makeData();
    input.scale = 0.2;
    t.deepEqual(cropData(input), {
        src: {
            x: 0,
            y: 0,
            width: 500,
            height: 500
        },
        dest: {
            x: 0,
            y: 0,
            width: 500,
            height: 500
        }
    });
    t.end();
});

test('2:1', function (t) {
    var input = makeData();
    input.scale = 0.4;
    input.panX = -125*0.4;
    input.panY = -125*0.4;

    t.deepEqual(cropData(input), {
        src: {
            x: 125,
            y: 125,
            width: 250,
            height: 250
        },
        dest: {
            x: 0,
            y: 0,
            width: 250,
            height: 250
        }
    });

    input.panX = -115*0.4;
    t.deepEqual(cropData(input), {
        src: {
            x: 115,
            y: 125,
            width: 250,
            height: 250
        },
        dest: {
            x: 0,
            y: 0,
            width: 250,
            height: 250
        }
    });

    t.end();
});

