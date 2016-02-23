import {join} from 'path';
import {DEMO_SRC, DEMO_DEST} from '../config';

export = function buildImagesDev(gulp, plugins) {
  return function () {
    return gulp.src([
        join(DEMO_SRC, '**/*.gif'),
        join(DEMO_SRC, '**/*.jpg'),
        join(DEMO_SRC, '**/*.png'),
        join(DEMO_SRC, '**/*.svg')
      ])
      .pipe(gulp.dest(DEMO_DEST));
  };
}
