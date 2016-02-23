import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

import {Component, ViewEncapsulation} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {
    RouteConfig,
    ROUTER_DIRECTIVES,
} from 'angular2/router';

import {LineChartDemoCmp} from '../line/line-demo';

import {HIGHCHART_DIRECTIVES} from 'ng2-highcharts/highcharts';


@Component({
    selector: 'app',
    viewProviders: [],
    templateUrl: './components/app/app.html',
    styleUrls: ['./components/app/app.scss'],
    encapsulation: ViewEncapsulation.None,
    directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES, HIGHCHART_DIRECTIVES]
})
@RouteConfig([
    {path: '/', component: LineChartDemoCmp, as: 'Line'}
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
