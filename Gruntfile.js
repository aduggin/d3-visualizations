'use strict';

module.exports = function (grunt) {
    // load jshint plugin
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'app/js/**/*.js',
                '!app/js/vendor/**/*.js'
            ]
        }
    });
};
