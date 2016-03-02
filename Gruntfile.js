module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            build: {
                files: {
                    "release/index.css": "src/css/*.less",
                }
            }
        },
        copy: {
            build: {
                files: [
                    {
                        src: 'src/index.html',
                        dest: 'release/index.html'
                    },
                    {
                        expand: true,
                        cwd: 'src/img/',
                        src: '**',
                        dest: 'release/img/'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');

    // Default task(s).
    grunt.registerTask('default', ['less', 'copy']);
};
