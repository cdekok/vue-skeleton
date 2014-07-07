require('insert-css')(require('./style.css'))

var page = require('page');

module.exports = {
    id: 'result',
    template: require('./template.html'),
    components: {
        pagination: require('./../component-pagination')
    },
    data: {
        msg: 'Result view',
        thumbs: [],
        media: []
    },
    filters : {
        detailLink: function(uuid) {
            return '/detail/' + uuid;
        }
    },
    'methods': {
        'setState': function(ctx, data) {
            this.media = data.media;
            // Set pagination data
            this.$.pagination.setState(ctx, data.metadata.pagination);
        },
        goToDetail: function(data, e) {
            e.preventDefault();
            var link = '/detail/' + data.id;
            page(link);
        }
    }
};