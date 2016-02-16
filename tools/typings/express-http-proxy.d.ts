declare module "express-http-proxy" {
  import * as express from "express";

  function proxy(root:string, options?:{
    forwardPath?: (req:express.Request, res:express.Response) => any;
    port?: number;
  });
}
