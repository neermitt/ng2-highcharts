import {join} from 'path';
import {DEMO_SRC, TMP_DIR} from '../config';
import {templateLocals, tsProjectFn} from '../utils';

var embedSass = require('gulp-angular2-embed-sass');

export = function buildJSDev(gulp, plugins) {
  return function () {
    let tsProject = tsProjectFn(plugins);
    let src = [
      join(DEMO_SRC, '**/*.ts'),
      '!' + join(DEMO_SRC, '**/*_spec.ts')
    ];

    let result = gulp.src(src)
      .pipe(plugins.plumber())
      .pipe(embedSass({basePath: DEMO_SRC}))
      .pipe(plugins.inlineNg2Template({base: TMP_DIR, css: false}))
      .pipe(plugins.typescript(tsProject));

    return result.js
      .pipe(plugins.template(templateLocals()))
      .pipe(gulp.dest(TMP_DIR));
  };
};
