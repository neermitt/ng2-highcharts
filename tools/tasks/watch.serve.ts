import * as runSequence from 'run-sequence';
import {join} from 'path';
import {LIB_SRC, DEMO_SRC} from '../config';
import {notifyLiveReload} from '../utils';

export = function watchServe(gulp, plugins) {
  return function () {
    plugins.watch([join(LIB_SRC, '**/*'), join(DEMO_SRC, '**/*')], e =>
      runSequence('build.dev', () => notifyLiveReload(e))
    );
  };
};
