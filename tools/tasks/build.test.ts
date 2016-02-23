import {join} from 'path';
import {DEMO_SRC, TEST_DEST} from '../config';
import {tsProjectFn} from '../utils';

var embedSass = require('gulp-angular2-embed-sass');


export = function buildTest(gulp, plugins) {
  return function () {
    let tsProject = tsProjectFn(plugins);
    let src = [
      join(DEMO_SRC, '**/*.ts'),
      '!' + join(DEMO_SRC, 'bootstrap.ts')
    ];

    let result = gulp.src(src)
      .pipe(plugins.plumber())
      .pipe(embedSass({basePath: DEMO_SRC}))
      .pipe(plugins.inlineNg2Template({base: DEMO_SRC, css: false}))
      .pipe(plugins.typescript(tsProject));

    return result.js
      .pipe(gulp.dest(TEST_DEST));
  };
};
