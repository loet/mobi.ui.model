module.exports.config = {

    src4concat: [
        'tmp/*.js', '!tmp/**/*.spec.js'
    ],

    bower_components: [
        'bower_components/angular/angular.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'bower_components/mobi.ui.date/dist/mobi.ui.date.js',
        'bower_components/angular-uuid4/angular-uuid4.js',
        'bower_components/mobi.ui.guid/dist/mobi.ui.guid.js'
    ]
}
;
