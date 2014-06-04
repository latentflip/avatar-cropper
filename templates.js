var templates = {};
templates._runtime = require('domthing/runtime');
templates['cropper'] = function (context, runtime) {
  runtime = runtime || this._runtime;
  var template = new runtime.Template();
  (function (parent) {
    (function (parent) {
      var element = document.createElement('div');
      var expr;
      element.setAttribute('class', 'cropper');
      (function (parent) {
        runtime.helpers['if'].call(template,
          parent,
          context,
          (
            runtime.helpers.STREAMIFY_BINDING.call(template, context, 'model.src')
          ),
          function (parent) {
            (function (parent) {
              var element = document.createElement('div');
              var expr;
              element.setAttribute('class', 'cropper-mask');
              (function (parent) {
                (function (parent) {
                  var element = document.createElement('img');
                  var expr;
                  expr = (
                    runtime.helpers.STREAMIFY_BINDING.call(template, context, 'model.src')
                  );
                  element.setAttribute('src', expr.value);
                  expr.on('change', element.setAttribute.bind(element, 'src'));
                  parent.appendChild(element);
                })(parent);
              })(element);
              parent.appendChild(element);
            })(parent);
            (function (parent) {
              var element = document.createElement('input');
              var expr;
              element.setAttribute('name', 'scale');
              element.setAttribute('type', 'range');
              expr = (
                runtime.helpers.STREAMIFY_BINDING.call(template, context, 'model.minScale')
              );
              element.setAttribute('min', expr.value);
              expr.on('change', element.setAttribute.bind(element, 'min'));
              expr = (
                runtime.helpers.STREAMIFY_BINDING.call(template, context, 'model.maxScale')
              );
              element.setAttribute('max', expr.value);
              expr.on('change', element.setAttribute.bind(element, 'max'));
              element.setAttribute('step', '0.1');
              expr = (
                runtime.helpers.STREAMIFY_BINDING.call(template, context, 'model.scale')
              );
              element.setAttribute('value', expr.value);
              expr.on('change', element.setAttribute.bind(element, 'value'));
              parent.appendChild(element);
            })(parent);
          },
          function (parent) {
            (function (parent) {
              var node = document.createTextNode('');
              var expr = (
                runtime.helpers.STREAMIFY_LITERAL.call(template, " No image, upload one. ")
              );
              node.data = expr.value;
              expr.on('change', function (text) { node.data = text; });
              parent.appendChild(node);
            })(parent);
          }
        );
      })(element);
      parent.appendChild(element);
    })(parent);
  })(template.html);
  var firstChild = template.html.firstChild;
  firstChild.update = template.update.bind(template);
  return firstChild;
}.bind(templates);
module.exports = templates;