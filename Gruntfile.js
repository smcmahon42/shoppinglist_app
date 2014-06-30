module.exports = function(grunt) {

  //LOADED NPM TASKS
  grunt.loadNpmTasks('grunt-bower-requirejs');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-karma');

  //REGISTERD TASK VARIABLES
  var target = grunt.option('target') || 'build';
  var opt = grunt.option('opt') || 'none';//none or uglify

  //REGISTERD TASKS
  grunt.registerTask('listen', ['watch']);
  grunt.registerTask('bbuild', ['bower']);
  grunt.registerTask('cbuild', ['compass']);
  grunt.registerTask('rbuild', ['requirejs']);
  grunt.registerTask('build', ['compass:build', 'requirejs', 'clean', 'copy', 'karma:continuous']);
  grunt.registerTask('release', ['compass:release', 'requirejs', 'clean', 'copy', 'karma:continuous']);

  // Project configuration.
  grunt.initConfig({
    distdir: 'dist',
    pkg: grunt.file.readJSON('package.json'),
    clean: ['<%= distdir %>/*'],
    copy: {
      assets: {
        files: [{ 
          dest: '<%= distdir %>', 
          src : ['css/**','index.html', 'assets/**', 'app/main.js', 'app/**', '!app/**/*.js' ], 
          expand: true, 
          cwd: 'build' }]
      }
    },//copy
    bower: {
      target: {
        rjsConfig: 'src/app/config.js'
      }
    },//bower
    karma: {
      options: {
        configFile: 'karma.conf.js',
        lgoLevel: 'ERROR',
      },
      unit: {
        browsers: ['Chrome'],
        background: true
      },
      continuous: {
        singleRun: true,
        browsers: ['PhantomJS', 'Chrome']
      }
    },//karma
    protractor: {
      options: {
        configFile: "node_modules/protractor/referenceConf.js", // Default config file
        keepAlive: true, // If false, the grunt process stops when the test fails.
        noColor: false, // If true, protractor will not use colors in its output.
        args: {
          // Arguments passed to the command
        }
      },
      your_target: {
        options: {
          configFile: "e2e.conf.js", // Target-specific config file
          args: {} // Target-specific arguments
        }
      },
    },//protractor
    requirejs: { //https://github.com/gruntjs/grunt-contrib-requirejs
        compile: {
            options: {
              mainConfigFile : "src/app/config.js",
              baseUrl : "src/app", 
              name: "config", 
              out: "src/app/main.js", 
              findNestedDependencies: true,
              keepBuildDir: true,
              optimize: opt
            }
        }
    },//requirejs
    compass: {
     build: {
        dist: {
          options: {
            sassDir: 'src/sass',
            cssDir:  'src/css',
            imagesPath: '../assets',
            environment: 'development',
            outputStyle : 'expanded'
          }
        }
      },//build
      release: {
        dist: {
          options: {
            sassDir: 'sass',
            cssDir:  'src/css',
            imagesPath: '../assets',
            environment: 'production',
            outputStyle : 'compressed'
          }
        }
      }//release
    },//compass
    sass: {
      dist: {
        options: {
          banner: "/* This file generated with 'grunt sass'. Don't edit it directly. Edit files in /sass/ directory instead. */",
        },
        files: {
          'src/css/main.css': 'src/sass/main.scss'
        }
      }
    },//sass
    watch: {
      css: {
        files: ['srv/sass/*/*.scss', 'src/app/js/**/*.js', 'test/browser/**/*.js'],
        tasks: ['compass:build', 'requirejs', 'clean', 'copy', 'karma:continuous'],
        options: {
          livereload: 80000
        }
      }
    }//watch
  });

};

