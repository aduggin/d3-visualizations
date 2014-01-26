'use strict';

module.exports = function (grunt) {

    // Load Grunt tasks declared in the package.json file
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Configure Grunt
    var sassFiles = [
        {
            expand: true,
            cwd: 'app/sass/',
            dest: '.tmp/styles/',
            src: '**/*.scss',
            ext: '.css'
        }
    ];

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'app/js/**/*.js',
                '!app/js/vendor/**/*.js',
                'test/**/*.js',
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
                    middleware: function (connect) {
                        var path = require('path');
                        return [
                            connect.static(path.resolve('app')),
                            connect.static(path.resolve('.tmp'))
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                }
            }
        },

        jasmine: {
            shell: {
                options: {
                    specs: ['test/specs/**/**_spec.js'],
                    vendor: ['app/js/vendor/**/*.js'],
                    outfile: 'test/index.html'
                },
                src: ['app/js/**/*.js', "!app/js/vendor"]
            }
        },

        watch: {
            html: {
                files: ['app/index.html'],
                options: {
                    livereload: true
                }
            },
            sass: {
                files: ['app/sass/*.scss'],
                tasks: ['sass:dev'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: [
                    'Gruntfile.js',
                    'app/js/**/*.js',
                    '!app/js/vendor/**/*.js',
                    'test/**/*.js',
                ],
                tasks: ['jshint', 'jasmine:shell'],
                options: {
                    livereload: true
                }
            }
        },

        open: {
            server: {
                path: 'http://0.0.0.0:9000'
            },
            test: {
                path: 'http://0.0.0.0:9001/test'
            }
        },

        clean: {
            all: [
                '.tmp',
                '.grunt',
                'test/index.html',
                'dist'
            ]
        },

        copy: {
            release: {
                files: [{
                    expand: true,
                    cwd: 'app',
                    dest: 'dist',
                    src: ['*.html', 'js/**/*']
                }, {
                    expand: true,
                    cwd: '.tmp',
                    dest: 'dist',
                    src: ['styles/*']
                }]
            }
        },
    });

    grunt.registerTask('server', 'Run a server', [
        'jshint',
        'sass:dev',
        'connect:server',
        'open:server',
        'watch'
    ]);

    grunt.registerTask('test', 'Run tests in the console', [
        'jshint',
        'jasmine'
    ]);

    grunt.registerTask('test:browser', 'Run tests in a browser', [
        'jshint',
        'jasmine:shell:build',
        'connect:test',
        'open:test',
        'watch'
    ]);

    grunt.registerTask('version', 'Shows version number', function () {
        var pkg = grunt.file.readJSON('package.json');
        console.log(pkg.name, pkg.version);
    });

    grunt.registerTask('release', 'Generates a release tarball', [
        'sass:prod',
        'test',
        'clean',
        'copy:release'
    ]);

};
