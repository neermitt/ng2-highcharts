import {join} from 'path';
import {LIB_SRC} from '../config';

export = function watchTest(gulp, plugins) {
  return function () {
    plugins.watch(join(LIB_SRC, '**/*.ts'), () => gulp.start('build.test'));
  };
};
