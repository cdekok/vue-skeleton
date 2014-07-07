require('insert-css')(require('./style.css'))

var page = require('page');
var qs = require('qs');
var $ = require('jquery');

module.exports = {
    id: 'pagination',
    template: require('./template.html'),
    data: {
        pagination: null,
        pages: [],
        next: null,
        prev: null
    },
    'methods': {
        'setState': function(ctx, data) {
            this.pagination = data;
            var pag = new pagination(data, ctx, 10);
            this.pages = pag.getPages();
            this.next = pag.getNextPage();
            this.prev = pag.getPrevPage();
        }
    }
};

/**
 * Pagination model
 *
 * @param {Object} data
 * @param {Object} ctx
 * @param {Integer} showPages
 * @returns {pagination.Anonym$2}
 */
var pagination = function(data, ctx, showPages) {

    if (!showPages) {
        showPages = 10;
    }

    var self = this;

    /**
     * Return array of pages
     *
     * @returns {pagination.getPages.pages|Array}
     */
    self.getPages = function () {
        var pages = [];
        var start = 0;
        if (data.pages < showPages) {
            showPages = data.pages + 1;
        }
        if (showPages / 2 < data.currentPage) {
            start = data.currentPage - (showPages / 2);
        }
        if ((start + showPages) > data.pages) {
            start = data.pages - showPages + 1;
        }
        for (var i = 1; showPages > i; i++) {
            var page = start + i;
            pages.push({
                'page': page,
                'link': '?page='+page,
                'active': page === data.currentPage
            });
        }
        return pages;
    };

    /**
     * Get previous page
     *
     * @returns {String}
     */
    self.getPrevPage = function() {
        if (data.currentPage > 1) {
            var prev = parseInt(data.currentPage) - 1;
            if (prev > data.pages) {
                prev = data.pages;
            }
            return self.getLink(prev);
        }
    };

    /**
     * Get next page
     *
     * @returns {String}
     */
    self.getNextPage = function()
    {
        if (data.currentPage < data.total) {
            var nextPage = parseInt(data.currentPage) + 1;
            return self.getLink(nextPage);
        }
    };

    /**
     * Get pagination link
     *
     * @param {type} page
     * @returns {String}
     */
    self.getLink = function(page) {
        var query = $.extend({}, ctx.query);
        query.page = page;
        return ctx.pathname + '?' + qs.stringify(query);
    };

    self.getLink(2);

    return {
        'getPages': self.getPages,
        'getPrevPage': self.getPrevPage,
        'getNextPage': self.getNextPage
    };
};