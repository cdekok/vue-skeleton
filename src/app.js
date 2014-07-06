require('insert-css')(require('./app.css'));
var Vue = require('vue');

module.exports = function(options) {

    var app = new Vue({
        el: options.el,
        components: {
            result: require('./component-result'),
            detail: require('./component-detail'),
            notfound: require('./component-notfound')
        },
        // require html enabled by the partialify transform
        template: require('./app.html'),
        data: {
            title: 'Mediabank'
        }
    });

    return {

        /**
         * Set current view model by id
         *
         * @param {String} view
         * @returns {undefined}
         */
        setView: function(view) {
            app.currentView = view;
        },

        /**
         * Set current application state
         *
         * @param {type} ctx
         * @param {type} data
         * @returns {undefined}
         */
        setState: function(ctx, data) {
            app.$.page.setState(ctx, data);
        }
    };
};