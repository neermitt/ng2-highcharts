import {join} from 'path';
import {DEMO_SRC, TOOLS_DIR} from '../config';

export = function tslint(gulp, plugins) {
  return function () {
    let src = [
      join(DEMO_SRC, '**/*.ts'),
      '!' + join(DEMO_SRC, '**/*.d.ts'),
      join(TOOLS_DIR, '**/*.ts'),
      '!' + join(TOOLS_DIR, '**/*.d.ts')
    ];

    return gulp.src(src)
      .pipe(plugins.tslint())
      .pipe(plugins.tslint.report(plugins.tslintStylish, {
        emitError: false,
        sort: true,
        bell: true
      }));
  };
};
