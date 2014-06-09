module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    shell: {
      runServer : {
        command : 'node index.js'
      }
    },
    open: {
      dev: {
        path: "http://localhost:3700"
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-shell-spawn');
  grunt.loadNpmTasks('grunt-open');

  // Default task(s).
  grunt.registerTask('start', "Starting server...", ['open:dev','shell:runServer']);
};