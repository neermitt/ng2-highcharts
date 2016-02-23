import {
  Directive, Input, Host
} from 'angular2/core';


import {ChartCmp} from "./chart";
import {AfterViewInit} from "angular2/core";
import {OnDestroy} from "angular2/core";


export abstract class AbstractHighchartSeries implements AfterViewInit, OnDestroy{
  private _chart: ChartCmp;
  @Input() name:string;
  @Input() data:any[];

  constructor(@Host() chart: ChartCmp) {
    this._chart = chart;
  }

  ngAfterViewInit():void {
    this._chart.addSeries({
      name: this.name,
      data: this.data
    })
  }

  ngOnDestroy():void {
    this._chart.removeSeries(this.name);
  }

}

@Directive({selector: 'line'})
export class LineSeries extends AbstractHighchartSeries {

  constructor(@Host() chart: ChartCmp) {
    super(chart);
  }
}
