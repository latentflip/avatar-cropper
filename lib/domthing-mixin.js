var AmpersandView = require('ampersand-view');
var AmpersandState = require('ampersand-state');

module.exports = {
    renderWithTemplate: function (props) {
        var self = this;

        this.on('all', function (name, model, value) {
            if (self.el && name.match(/^change:/)) {
                self.el.update(name.split(':')[1], value);
            }
        });

        return AmpersandView.prototype.renderWithTemplate.apply(this, arguments);
    }
};
