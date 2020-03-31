module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
/*        less: {
            default: {
                options: {
                    compress: false,
                },
                files: {
                    "catalog/view/theme/radialkanew/css/main.css":"catalog/view/theme/radialkanew/css/main.less"
                }
            }
        },*/
        concat: {
            options: {
                separator: "\n", //add a new line after each file
                banner: "", //added before everything   $(function() {
                footer: "" //added after everything     });
            },
            default: {
                src: [
                    'src/js/templateLoader.js',
                    'src/js/main.js',
                    'src/js/views.js',
                    'src/js/adm-views.js',
                    'src/js/router.js',
                    'src/js/app.js'
                ],
                dest: 'js/app.js'
            },
            tepmplates: {
                src: ['tpl/pages/*.*'],
                dest: 'tpl/pages.html.tpl'
            }
        },
        uglify: {
            dist: {
                options: {
                    mangle: false
                },
                files: {
                    'js/app.min.js': ['js/app.js']
                }
            }
        },
        watch: {
            default: {
                files: [
                    'src/js/**/*.js',
                    'tpl/pages/*.*'
                ],
                tasks: ['concat','uglify']
            }
        }
    });

    /*grunt.loadNpmTasks('grunt-contrib-less');*/
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Task definition
    grunt.registerTask('default', ['watch']);
};