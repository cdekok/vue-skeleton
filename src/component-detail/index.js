require('insert-css')(require('./style.css'))

var page = require('page');

module.exports = {
    id: 'detail',
    template: require('./template.html'),
    data: {
        msg: 'Detail view',
        media: null
    },
    'methods': {
        'setState': function(ctx, data) {
            this.media = data.media[0];
        },
        goToResult: function(e) {
            e.preventDefault();
            var link = '/';
            page(link);
        }
    }
};