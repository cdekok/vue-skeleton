var app = function(options) {
    // jQuery
    var $ = require('jquery');
    // router
    var page = require('page');
    // query string
    var qs = require('qs');
    // vue app
    var myApp = require('./app');

    var defaultOptions = {
        'el': '#app'
    };

    $.extend(defaultOptions, options);

    var app = new myApp(defaultOptions);

    /**
     * Parse query string on every request
     *
     * @param {type} ctx
     * @param {type} test
     * @returns {undefined}
     */
    page('*', parse);

    page('/', function(ctx, next) {
        app.setView('result');
        // Call api
        $.getJSON(defaultOptions.url, {apiKey: defaultOptions.apiKey}, function(data) {
            app.setState(ctx, data);
        });
    });

    page('/detail/:id', function(ctx, next) {
        // Call api
        app.setView('detail');
        // Call api
        $.getJSON(defaultOptions.url + '/' + ctx.params.id , {apiKey: defaultOptions.apiKey}, function(data) {
            app.setState(ctx, data);
        });
    });

    page('*', function(){
        console.log('x');
        app.setView('notfound');
    });

    page();

    /**
     * Parse query string
     *
     * @param {type} ctx
     * @param {type} next
     * @returns {undefined}
     */
    function parse(ctx, next) {
        ctx.query = qs.parse(ctx.querystring);
        next();
    }

};

global.app = app;
