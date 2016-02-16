/// <reference path="../tools/typings/tsd/systemjs/systemjs.d.ts"/>

import {provide} from 'angular2/core';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {AppCmp} from './demo/app/app';

System.import('//localhost:<%= HOT_LOADER_PORT %>/ng2-hot-loader')
  .then(loader => {
    loader.ng2HotLoaderBootstrap(AppCmp, [
      ROUTER_PROVIDERS,
      HTTP_PROVIDERS,
      provide(LocationStrategy, {useClass: HashLocationStrategy})
    ]);
  });
