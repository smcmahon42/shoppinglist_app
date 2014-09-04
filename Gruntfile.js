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
  grunt.registerTask('listen',  ['watch']);
  grunt.registerTask('bbuild',  ['bower']);
  grunt.registerTask('cbuild',  ['compass']);
  grunt.registerTask('rbuild',  ['requirejs']);
  grunt.registerTask('build',   ['compass:dev', 'requirejs', 'clean', 'copy', 'karma:continuous']);
  grunt.registerTask('release', ['compass:dist', 'requirejs', 'clean', 'copy', 'karma:continuous']);

  // Project configuration.
  grunt.initConfig({
    distdir: 'dist',
    srcdir: 'src',
    pkg: grunt.file.readJSON('package.json'),
    clean: ['<%= distdir %>/*'],
    copy: {
      assets: {
        files: [{ 
          dest: '<%= distdir %>', 
          src : [ 'css/**','index.html', 
                  'assets/**', 'app/**', 
                  '!app/**/*.js', 
                  'app/main.js', 
                  '!app/_directives', 
                  '!app/_services', 
                  'vendor/requirejs/require.js' 
                ], 
          expand: true, 
          cwd: '<%= srcdir %>' }]
      }
    },//copy
    bower: {
      target: {
        rjsConfig: '<%= srcdir %>/app/config.js'
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
        browsers: ['PhantomJS']
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
              baseUrl : "<%= srcdir %>/app", 
              name: "config", 
              out: "<%= srcdir %>/app/main.js", 
              findNestedDependencies: true,
              keepBuildDir: true,
              optimize: opt
            }
        }
    },//requirejs
    compass: {
      dev: {
        options: {
          sassDir: '<%= srcdir %>/sass',
          cssDir:  '<%= srcdir %>/css',
          imagesPath: '../assets',
          environment: 'development',
          outputStyle : 'expanded'
        }
      },
      dist: {
        options: {
          sassDir: '<%= srcdir %>/sass',
          cssDir:  '<%= srcdir %>/css',
          imagesPath: '../assets',
          environment: 'production',
          outputStyle : 'compressed'
        }
      }
    },//compass
    sass: {
      dist: {
        options: {
          banner: "/* This file generated with 'grunt sass'. Don't edit it directly. Edit files in /sass/ directory instead. */",
        },
        files: {
          '<%= srcdir %>/css/main.css': '<%= srcdir %>/sass/main.scss'
        }
      }
    },//sass
    watch: {
      css: {
        files: ['<%= srcdir %>/sass/*/*.scss', '<%= srcdir %>/app/**/*.js', 'test/browser/**/*.js'],
        tasks: ['compass:build', 'requirejs', 'clean', 'copy', 'karma:continuous'],
        options: {
          livereload: 80000
        }
      }
    }//watch
  });

};

