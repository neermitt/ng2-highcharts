import {Component} from 'angular2/core';

import {HIGHCHART_DIRECTIVES} from '../../../src/ng2-highcharts';

@Component({
  selector: 'area-demo',
  templateUrl: './demo/components/area/area-demo.html',
  directives: [HIGHCHART_DIRECTIVES]
})
export class AreaChartDemoCmp {
}
