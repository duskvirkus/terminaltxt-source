const path = require('path');

module.exports = (grunt) => {

  // ---------------------------------------------------------------------------
  // Config

  grunt.initConfig({

    // -------------------------------------------------------------------------
    // Shell

    shell: {
      cloneDist: {
        command: 'git clone https://github.com/figraham/picturesque-dist build',
      },
    },

    // -------------------------------------------------------------------------
    // Clean

    clean: {
      prebuild: ['./build'],
    },

  });

  // ---------------------------------------------------------------------------
  // Load Tasks

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // ---------------------------------------------------------------------------
  // Builds

  // Default
  grunt.registerTask('build', ['build:both']);

  // Both
  grunt.registerTask('build:both', [
    'build:common',
    'build:development',
    'build:production',
  ]);

  // Common
  grunt.registerTask('build:common', [
    'clean:prebuild',
    'shell:cloneDist',
  ]);

  // Production Build
  grunt.registerTask('build:prod', ['build:common', 'build:production']);
  grunt.registerTask('build:production', [
    'notask',
  ]);

  // Development Build
  grunt.registerTask('build:dev', ['build:common', 'build:development']);
  grunt.registerTask('build:development', [
    'notask',
  ]);

  // ---------------------------------------------------------------------------
  // Testing

  // Default
  grunt.registerTask('test', ['test:all']);

  // All
  grunt.registerTask('test:all', [
    '',
  ]);

  // ---------------------------------------------------------------------------
  // Helper Tasks

  grunt.registerTask('notask', function() {
    grunt.log.writeln("No Task Implemented Yet!")
  });

}