import {join} from 'path';
import {DEMO_SRC, DEMO_DEST} from '../config';
import {templateLocals, tsProjectFn} from '../utils';

var embedSass = require('gulp-angular2-embed-sass');

export = function buildJSDev(gulp, plugins) {
  let tsProject = tsProjectFn(plugins);
  return function () {
    let src = [
      join(DEMO_SRC, '**/*.ts')
    ];

    let result = gulp.src(src)
      .pipe(plugins.plumber())
      .pipe(embedSass({basePath: DEMO_SRC}))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.typescript(tsProject));

    return result.js
      .pipe(plugins.sourcemaps.write())
      .pipe(plugins.template(templateLocals()))
      .pipe(gulp.dest(DEMO_DEST));
  };
};
