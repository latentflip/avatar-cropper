module.exports = function (el, styles, options) {
    options = options || {};

    var style;
    for (style in styles) {
        el.style[style] = styles[style];
        if (options.prefix !== false) el.style[prefixStyle(style)] = styles[style];
    }
};


// extra utils

var prefix;

if (document.body) {
    prefix = getVendorPrefix();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        prefix = getVendorPrefix();
    });
}

function prefixStyle(style) {
    return (prefix + style[0].toUpperCase() + style.substr(1));
}

function getVendorPrefix() {
    return Array.prototype.slice.call(
          document.defaultView.getComputedStyle(document.body, "")
    )
    .join("")
    .match(/(?:-(moz|webkit|ms|khtml)-)/)[1];
}
