import * as async from 'async';
import * as del from 'del';
import {LIB_DEST, DEMO_DEST, TEST_DEST, TMP_DIR} from '../config';

export = function clean(gulp, plugins, option) {
  return function (done) {

    switch (option) {
      case 'all'    :
        cleanAll(done);
        break;
      case 'dist'   :
        cleanDist(done);
        break;
      case 'demo'   :
        cleanDemo(done);
        break;
      case 'test'   :
        cleanTest(done);
        break;
      case 'tmp'    :
        cleanTmp(done);
        break;
      default:
        done();
    }

  };
};

function cleanAll(done) {
  async.parallel([
    cleanDist,
    cleanDemo,
    cleanTest,
    cleanTmp
  ], done);
}
function cleanDist(done) {
  del(LIB_DEST, done);
}
function cleanDemo(done) {
  del(DEMO_DEST, done);
}
function cleanTest(done) {
  del(TEST_DEST, done);
}
function cleanTmp(done) {
  del(TMP_DIR, done);
}
