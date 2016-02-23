import * as express from 'express';
import * as connectLivereload from 'connect-livereload';
import {ENABLE_HOT_LOADING, LIVE_RELOAD_PORT, HOT_LOADER_PORT, LIB_SRC, DEMO_SRC, LIB_BASE, PROJECT_ROOT} from '../config';
import * as ng2HotLoader from 'angular2-hot-loader';
import * as tinylrFn from 'tiny-lr';
import {sep} from 'path';

let tinylr = tinylrFn();
let listen = () => {
  if (ENABLE_HOT_LOADING) {
    return ng2HotLoader.listen({
      port: HOT_LOADER_PORT,
      processPath: file => {
        file.replace(`${PROJECT_ROOT}${sep}${LIB_SRC}`, '/dist/dev/');
        return file.replace(`${PROJECT_ROOT}${sep}${DEMO_SRC}`, '/dist/demo/dev/');
      }
    });
  } else {
    return tinylr.listen(LIVE_RELOAD_PORT);
  }
};

let changed = files => {
  if (!(files instanceof Array)) {
    files = [files];
  }
  if (ENABLE_HOT_LOADING) {
    ng2HotLoader.onChange(files);
  } else {
    tinylr.changed({
      body: {files}
    });
  }
};

let tinylrMiddleware = connectLivereload({port: LIVE_RELOAD_PORT});
let middleware = [
  LIB_BASE,
  (req, res, next) => {
    if (ENABLE_HOT_LOADING) {
      next();
    } else {
      tinylrMiddleware(req, res, next);
    }
  },
  express.static(process.cwd())
];

export { listen, changed, middleware };
