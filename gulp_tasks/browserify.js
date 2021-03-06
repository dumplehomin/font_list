"use strict";

var gulp = require("gulp");
var config = require("../gulp.config.js");
var log = require("./util/log");
var yargs  = require('yargs').argv;
//-----------------------------------------------------------
//Browserify를 사용하기 위한 모듈 로드
var browserify = require("browserify");
var watchify = require("watchify");
var assign = require("lodash.assign");
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var $ = require('gulp-load-plugins')({'lazy': true});
//-----------------------------------------------------------
var bundler = browserify(config.browserify.options);
// Bundle 업무를 수행하는 함수
var bundleHandler = (message) => {
  log(message);
  return bundler
    .bundle()
    .pipe(source(config.browserify.output_filename))
    .pipe(buffer())
      // 오류 발생 시, 콘솔에 오류 메시지 출력
      .on('error', $.util.log.bind($.util, 'Browserify 오류'))
      // 조건 --min 옵션 값(true, false)에 따라 압축(Uglify) 처리
      // .pipe($.if(yargs.min, $.uglify()))
      .pipe( $.uglify() )
    // 소스맵 초기화 (이미 소스맵 파일 존재하면 해당 파일을 읽어서 속도를 향상)
    .pipe($.sourcemaps.init({'readMaps': config.browserify.read_sourcemap}))
    // 소스맵 쓰기
    .pipe($.sourcemaps.write(config.browserify.sourcemaps))
    .pipe(gulp.dest(config.browserify.output));
};
//-----------------------------------------------------------
gulp.task('browserify', bundleHandler.bind(gulp, 'Javascript 번들링'));

// browserify 관찰 업무
gulp.task('browserify:watch', ['browserify'], function() {
  // 옵션 덮어쓰기
  var opts = assign({}, watchify.args, config.browserify.options);
  // Watchify 래핑된 Browserify 객체
  bundler = watchify(browserify(opts));
  bundleHandler.call(gulp, '번들링 관찰 중...');
  // 이벤트 처리(감지)
  bundler.on('update', bundleHandler);
  bundler.on('log', $.util.log);
});