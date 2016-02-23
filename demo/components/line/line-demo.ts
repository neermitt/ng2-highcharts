import {Component} from 'angular2/core';

import {HIGHCHART_DIRECTIVES} from '../../../src/ng2-highcharts';

@Component({
  selector: 'line-demo',
  templateUrl: './demo/components/line/line-demo.html',
  directives: [HIGHCHART_DIRECTIVES]
})
export class LineChartDemoCmp {

}
