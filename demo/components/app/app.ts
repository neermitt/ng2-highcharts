import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

import {Component, ViewEncapsulation} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {
  RouteConfig,
  ROUTER_DIRECTIVES,
} from 'angular2/router';

import {LineChartDemoCmp} from '../line/line-demo';
import {AreaChartDemoCmp} from "../area/area-demo";

var Highcharts = require('highcharts');

@Component({
  selector: 'app',
  viewProviders: [],
  templateUrl: './demo/components/app/app.html',
  styleUrls: ['./demo/components/app/app.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES]
})
@RouteConfig([
  {path: '/', component: LineChartDemoCmp, as: 'Line'},
  {path: '/area', component: AreaChartDemoCmp, as: 'Area'}
])
export class AppCmp {

  constructor() {
    Highcharts.setOptions({
      global: {
        useUTC: true
      }
    });
  }

}
