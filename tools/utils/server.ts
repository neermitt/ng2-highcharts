import * as url from 'url';
import * as util from 'gulp-util';
import * as express from 'express';
import * as openResource from 'open';
import * as serveStatic from 'serve-static';
import * as codeChangeTool from './code_change_tools';
import {resolve} from 'path';
import {APP_BASE, APP_DEST, DOCS_DEST, DOCS_PORT, PORT} from '../config';


var proxy = require('express-http-proxy');

export function serveSPA() {
  let server = express();
  codeChangeTool.listen();
  server.use.apply(server, codeChangeTool.middleware);


  server.use('/api', proxy('http://localhost:8080', {

    forwardPath: function (req:express.Request, res:express.Response) {
      console.log('Path requested' + req.path);
      return '/api' + url.parse(req.path).path;
    }
  }));

  server.listen(PORT, () => {
    util.log('Server is listening on port: ' + PORT);
    openResource('http://localhost:' + PORT + APP_BASE + APP_DEST);
  });
}

export function notifyLiveReload(e) {
  let fileName = e.path;
  codeChangeTool.changed(fileName);
}

export function serveDocs() {
  let server = express();

  server.use(
    APP_BASE,
    serveStatic(resolve(process.cwd(), DOCS_DEST))
  );

  server.listen(DOCS_PORT, () =>
    openResource('http://localhost:' + DOCS_PORT + APP_BASE)
  );
}
