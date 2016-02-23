import {join} from 'path';
import {LIB_SRC, LIB_DEST} from '../config';
import {templateLocals, tsProjectFn} from '../utils';

var embedSass = require('gulp-angular2-embed-sass');

export = function buildJSDev(gulp, plugins) {
  let tsProject = tsProjectFn(plugins);
  return function () {
    let src = [
      join(LIB_SRC, '**/*.ts'),
      '!' + join(LIB_SRC, '**/*_spec.ts')
    ];

    let result = gulp.src(src)
      .pipe(plugins.plumber())
      .pipe(embedSass({basePath: LIB_SRC}))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.typescript(tsProject));

    return result.js
      .pipe(plugins.sourcemaps.write())
      .pipe(plugins.template(templateLocals()))
      .pipe(gulp.dest(LIB_DEST));
  };
};
