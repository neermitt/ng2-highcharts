import {Component} from 'angular2/core';

import {HIGHCHART_DIRECTIVES} from 'ng2-highcharts/highcharts';

@Component({
  selector: 'line-demo',
  templateUrl: './components/line/line-demo.html',
  directives: [HIGHCHART_DIRECTIVES]
})
export class LineChartDemoCmp {

}
