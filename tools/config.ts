import {readFileSync} from 'fs';
import {argv} from 'yargs';
import {normalize, join} from 'path';


// --------------
// Configuration.
export const PROJECT_ROOT = normalize(join(__dirname, '..'));
export const ENV = argv['env'] || 'dev';
export const DEBUG = argv['debug'] || false;
export const PORT = argv['port'] || 5555;
export const LIVE_RELOAD_PORT = argv['reload-port'] || 4002;
export const DOCS_PORT = argv['docs-port'] || 4003;
export const LIB_BASE = argv['base'] || '/';

export const ENABLE_HOT_LOADING = !!argv['hot-loader'];
export const HOT_LOADER_PORT = 5578;

export const BOOTSTRAP_MODULE = ENABLE_HOT_LOADING ? 'hot_loader_bootstrap' : 'bootstrap';

export const APP_TITLE = 'Angular 2 Highcharts';

export const LIB_SRC = 'src';
export const DEMO_SRC = 'demo';
export const DEMO_ASSETS_SRC = `${DEMO_SRC}/assets`;

export const TOOLS_DIR = 'tools';
export const TMP_DIR = 'tmp';
export const TEST_DEST = 'test';
export const DOCS_DEST = 'docs';
export const LIB_DEST = `dist/${ENV}`;
export const LIB_ROOT = ENV === 'dev' ? `${LIB_BASE}${LIB_DEST}/` : `${LIB_BASE}`;
export const DEMO_DEST = `dist/demo/${ENV}`;
export const DEMO_BUNDLES_DEST = `${DEMO_DEST}/bundles`;
export const DEMO_CSS_DEST = `${DEMO_DEST}/css`;
export const DEMO_LIB_DEST = `${DEMO_DEST}/lib`;
export const DEMO_ROOT = ENV === 'dev' ? `${LIB_BASE}${DEMO_DEST}/` : `${LIB_BASE}`;
export const VERSION = appVersion();

export const VERSION_NPM = '2.14.7';
export const VERSION_NODE = '4.0.0';

// Declare NPM dependencies (Note that globs should not be injected).
export const NPM_DEPENDENCIES = [
  {src: 'systemjs/dist/system-polyfills.js', dest: DEMO_LIB_DEST},

  {src: 'es6-shim/es6-shim.min.js', inject: 'shims', dest: DEMO_LIB_DEST},
  {src: 'reflect-metadata/Reflect.js', inject: 'shims', dest: DEMO_LIB_DEST},
  {src: 'systemjs/dist/system.src.js', inject: 'shims', dest: DEMO_LIB_DEST},
  {src: 'angular2/bundles/angular2-polyfills.js', inject: 'shims', dest: DEMO_LIB_DEST},

  // Faster dev page load
  {src: 'rxjs/bundles/Rx.js', inject: 'libs', dest: DEMO_LIB_DEST},
  {src: 'angular2/bundles/angular2.dev.js', inject: 'libs', dest: DEMO_LIB_DEST},
  {src: 'angular2/bundles/router.js', inject: 'libs', dest: DEMO_LIB_DEST}, // use router.min.js with alpha47
  {src: 'angular2/bundles/http.dev.js', inject: 'libs', dest: DEMO_LIB_DEST},

  // JQuery and HighCharts
  {src: 'jquery/dist/jquery.js', inject: 'libs', dest: DEMO_LIB_DEST},
  {src: 'highcharts/highcharts', inject: 'libs', dest: DEMO_LIB_DEST},


  {src: 'bootstrap/dist/css/bootstrap.min.css', inject: true, dest: DEMO_CSS_DEST}
];

// Declare local files that needs to be injected
export const APP_ASSETS = [
  {src: `${DEMO_ASSETS_SRC}/main.css`, inject: true, dest: DEMO_CSS_DEST}
];

NPM_DEPENDENCIES
  .filter(d => !/\*/.test(d.src)) // Skip globs
  .forEach(d => d.src = require.resolve(d.src));

export const DEPENDENCIES = NPM_DEPENDENCIES.concat(APP_ASSETS);


// ----------------
// SystemsJS Configuration.
const SYSTEM_CONFIG_DEV = {
  defaultJSExtensions: true,
  paths: {
    'bootstrap': `${DEMO_ROOT}bootstrap`,
    'hot_loader_bootstrap': `${DEMO_ROOT}hot_loader_bootstrap`,
    'ng2-highcharts/*': `${LIB_ROOT}*`,
    '*': `${LIB_BASE}node_modules/*`
  }
};

const SYSTEM_CONFIG_PROD = {
  defaultJSExtensions: true,
  bundles: {
    'bundles/app': ['bootstrap']
  }
};

export const SYSTEM_CONFIG = ENV === 'dev' ? SYSTEM_CONFIG_DEV : SYSTEM_CONFIG_PROD;

// This is important to keep clean module names as 'module name == module uri'.
export const SYSTEM_CONFIG_BUILDER = {
  defaultJSExtensions: true,
  paths: {
    '*': `${TMP_DIR}/*`,
    'angular2/*': 'node_modules/angular2/*',
    'rxjs/*': 'node_modules/rxjs/*',
    'ng2-highcharts/*': `${LIB_SRC}/*`
  }
};


// --------------
// Private.
function appVersion():number|string {
  var pkg = JSON.parse(readFileSync('package.json').toString());
  return pkg.version;
}
