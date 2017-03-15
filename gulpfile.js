'use strict';

const gulp = require('gulp');
const ts = require('gulp-typescript');
const chalk = require('chalk');
const nodemon = require('gulp-nodemon');
const path = require('path');

// Constants
const rootDir = __dirname;
const SHARED_TS_CONFIG_PATH = path.resolve(__dirname, 'src/shared/tsconfig.json');
const SERVER_TS_CONFIG_PATH = path.resolve(__dirname, 'src/server/tsconfig.json');
const tsProject = ts.createProject(SERVER_TS_CONFIG_PATH);
const sharedTsProject = ts.createProject(SHARED_TS_CONFIG_PATH);
gulp.task('transpile-shared', () => {
  return gulp.src(['./src/shared/**/*.ts', './src/shared/*.ts'])
    .pipe(sharedTsProject())
    .js
    .pipe(gulp.dest('./dist/shared'));
});

gulp.task('transpile-server', ['transpile-shared'], () => {
  console.log(chalk.yellow('Recompiling server-side typescript...'));
  return gulp.src(['./src/server/**/*.ts', './src/server/*.ts'])
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