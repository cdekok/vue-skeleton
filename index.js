var app = function(options) {
    var page = require('page');
    var index = require('./app/index');
    page('/', index);
    //page('/user/:user', show);
    //page('/user/:user/edit', edit);
    //page('/user/:user/album', album);
    //page('/user/:user/album/sort', sort);
    //page('*', notfound);
    page();
}

global.app = app;
