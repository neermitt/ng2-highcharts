import {join} from 'path';
import {DEMO_SRC, DEMO_DEST} from '../config';

export = function buildSassDev(gulp, plugins, option) {
  return function () {
    return gulp.src(join(DEMO_SRC, '**', '*.scss'))
      .pipe(plugins.sass().on('error', plugins.sass.logError))
      .pipe(gulp.dest(DEMO_DEST));
  };
}
