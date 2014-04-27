module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          banner: "/* This file generated with 'grunt sass'. Don't edit it directly. Edit files in /sass/ directory instead. */",
        },
        files: {
          'css/main.css': 'sass/main.scss'
        }
      }
    },

    bower: {
      target: {
        rjsConfig: 'app/config.js'
      }
    },

    requirejs: { //https://github.com/gruntjs/grunt-contrib-requirejs
      compile: {
        options: {
          mainConfigFile : "app/config.js",
          baseUrl : "app", 
          name: "config", 
          out: "app/main.js", 
          findNestedDependencies: true
        }
      }
    },

    compass: {
      dist: {
        options: {
          sassDir: 'sass',
          cssDir:  'css',
          imagesPath: 'img',
          environment: 'production',
          outputStyle : 'compressed'
        }
      }
    },

    watch: {
      css: {
        files: 'sass/*/*.scss',
        tasks: ['compass'],
        options: {
          livereload: 80000
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-requirejs');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('default', ['bower']);
  grunt.registerTask('default', ['compass']);
  grunt.registerTask('default', ['requirejs']);
};
