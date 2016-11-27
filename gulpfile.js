'use strict';

const gulp = require('gulp');
const ts = require('gulp-typescript');
const chalk = require('chalk');
const nodemon = require('gulp-nodemon');

const tsProject = ts.createProject('./tsconfig.server.json');
gulp.task('transpile-server', () => {
  console.log(chalk.yellow('Recompiling server-side typescript...'));
  return gulp.src(['./src/server/**/*.ts', './lib/server/*.ts'])
    .pipe(tsProject())
    .js
    .pipe(gulp.dest('./dist/server'));
});

gulp.task('nodemon', ['transpile-server'], cb => {
  let started = false;
  return nodemon({
    script: './dist/server',
    ext: 'ts',
    watch: './src/server',
    tasks: ['transpile-server'],
    env: { 'NODE_PATH': './' },
    ignore: ['node_modules', 'package.json', 'gulpfile.js']
  }).on('start', function() {
    if (!started) {
      cb();
      started = true;
    }
  }).on('restart', function() {
    console.log(chalk.green('Restarting server'));
  });
});

gulp.task('default', ['nodemon']);