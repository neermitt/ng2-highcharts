///<reference path="../node_modules/retyped-highcharts-tsd-ambient/highcharts.d.ts"/>
import {Directive, ElementRef, Input, OnChanges, SimpleChange} from 'angular2/core';

var Highcharts = require('highcharts');

@Directive({
  selector: 'ng2-highchart'
})
export class ChartCmp implements OnChanges {

  _hostElement:ElementRef;
  _chart:HighchartsChartObject;
  _renderTo:HTMLElement;

  @Input() title:string = '';
  @Input() subTitle:string = '';
  @Input() enableLegend:boolean = false;

  constructor(ele:ElementRef) {
    this._hostElement = ele;
    this._renderTo = this._hostElement.nativeElement;
  }

  addSeries(series:HighchartsIndividualSeriesOptions):void {
    this._chart.addSeries(series);
  }

  removeSeries(name:string):void {
    var seriesLength = this._chart.series.length;
    for (var i = seriesLength - 1; i > -1; i--) {
      if (this._chart.series[i].name == name)
        this._chart.series[i].remove();
    }
  }

  ngOnChanges(changes:{
    [key: string]: SimpleChange;
  }) {
    var chartOptions = {
      title: {
        text: this.title
      },
      subtitle: {
        text: this.subTitle
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: this.enableLegend
      },
      series : []
    };

    this._setOptions(chartOptions);
  }

  private _setOptions(opt:HighchartsOptions):void {
    if (!opt) {
      console.log('No valid options...');
      console.log(opt);
      return;
    }
    if (opt.series || opt.data) {
      if (this._chart) {
        this._chart.destroy();
      }
      opt.chart = opt.chart || {};
      opt.chart.renderTo = this._renderTo;
      this._chart = new Highcharts.Chart(opt);
    } else {
      console.log('No valid options...');
      console.dir(opt);
    }
  }
}
