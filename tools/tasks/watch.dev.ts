import {join} from 'path';
import {LIB_SRC, DEMO_SRC} from '../config';

export = function watchDev(gulp, plugins) {
  return function () {
    plugins.watch([join(LIB_SRC, '**/*'), join(DEMO_SRC, '**/*')], () => gulp.start('build.dev'));
  };
};
