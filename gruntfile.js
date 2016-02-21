module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
      concat: {
        js: {
          files: {
            'js/headerscripts.js': ['src/js/header/*.js'],
            'js/footerscripts.js': ['src/js/footer/*.js'],
          },
        },
      },
      uglify: {
        my_target: {
          files: {
            'js/headerscripts.min.js': ['js/headerscripts.js'],
            'js/footerscripts.min.js': ['js/footerscripts.js']
          }
        }
      },
      sass: {
        dist: {
          files: {
            'css/readpattersonwedding.css': 'src/sass/readpattersonwedding.scss'  // this file compiles all SASS sub-files
          }
        }
      },
      cssmin : {
        css:{
          src: 'css/readpattersonwedding.css',
          dest: 'css/readpattersonwedding.min.css'
        }
      },
      postcss: {
        options: {
          map: true, // inline sourcemaps

          // or
          map: {
              inline: false, // save all sourcemaps as separate files...
              annotation: 'css/' // ...to the specified directory
          },

          processors: [
            require('autoprefixer-core')({browsers: 'last 2 versions'}), // add vendor prefixes
            // require('cssnano')() // minify the result
          ]
        },
        dist: {
          src: 'css/*.css'
        }
      }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-postcss');

  // Default task(s).
  grunt.registerTask('default', [
    'concat',
    'uglify',
    'sass',
    'cssmin',
    'postcss'
    ]);
};
