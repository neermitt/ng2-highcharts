import {LIB_BASE, DEMO_DEST, DEMO_ROOT, APP_TITLE, SYSTEM_CONFIG, VERSION, HOT_LOADER_PORT, BOOTSTRAP_MODULE} from '../config';

// TODO: Add an interface to register more template locals.
export function templateLocals() {
  return {
    LIB_BASE,
    DEMO_DEST,
    DEMO_ROOT,
    APP_TITLE,
    SYSTEM_CONFIG,
    VERSION,
    BOOTSTRAP_MODULE,
    HOT_LOADER_PORT
  };
}
