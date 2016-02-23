import {join, sep} from 'path';
import {DEMO_SRC, DEMO_DEST, DEPENDENCIES, ENV} from '../config';
import {transformPath, templateLocals} from '../utils';

export = function buildIndexDev(gulp, plugins) {
  return function () {
    return gulp.src(join(DEMO_SRC, 'index.html'))
      // NOTE: There might be a way to pipe in loop.
      .pipe(inject('shims'))
      .pipe(inject('libs'))
      .pipe(inject())
      .pipe(plugins.template(templateLocals()))
      .pipe(gulp.dest(DEMO_DEST));
  };


  function inject(name?:string) {
    return plugins.inject(gulp.src(getInjectablesDependenciesRef(name), {read: false}), {
      name,
      transform: transformPath(plugins, 'dev')
    });
  }

  function getInjectablesDependenciesRef(name?:string) {
    return DEPENDENCIES
      .filter(dep => dep['inject'] && dep['inject'] === (name || true))
      .map(mapPath);
  }

  function mapPath(dep) {
    let prodPath = join(dep.dest, dep.src.split(sep).pop());
    return ('prod' === ENV ? prodPath : dep.src );
  }
};
