'use strict';

module.exports = function (grunt) {
    // load jshint plugin
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');

    var sassFiles = [{
        expand: true,
        cwd: 'app/sass/',
        dest: '.tmp/styles/',
        src: '**/*.scss',
        ext: '.css'
    }];

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
        },
        sass: {
            options: {
                cacheLocation: '.tmp/.sass-cache'
            },
            dev: {
                options: {
                    style: 'expanded',
                    lineComments: true
                },
                files: sassFiles
            },
            prod: {
                options: {
                    style: 'compressed'
                },
                files: sassFiles
            }
        },
        connect: {
            server: {
                options: {
                    port: 9000,
                    keepalive: true,
                    middleware: function (connect) {
                        var path = require('path');
                        return [
                            connect.static(path.resolve('app')),
                            connect.static(path.resolve('.tmp'))
                        ];
                    }
                }
            }
        }
    });
};
