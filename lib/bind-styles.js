var applyStyles = require('./apply-styles');

module.exports = function (model, bindings, element) {
    var propName, transformFn;

    Object.keys(bindings).forEach(function (style) {
        var binding = bindings[style];

        if (!Array.isArray(binding)) {
            propName = binding;
            transformFn = null;
        } else {
            propName = binding[0];
            transformFn = binding[1];
        }

        var applyBinding = function (model, value) {
            var update = {};

            if (!transformFn) {
                update[style] = value;
            } else {
                update[style] = transformFn(value);
            }
            applyStyles(element, update);
        };

        model.on('change:' + propName, applyBinding);
        applyBinding(model, model[propName]);
    });
};
