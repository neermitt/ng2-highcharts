import {
  Directive, Input, Host
} from 'angular2/core';


import {ChartCmp} from "./chart";
import {AfterViewInit} from "angular2/core";
import {OnDestroy} from "angular2/core";


export abstract class AbstractHighchartSeries implements AfterViewInit, OnDestroy{
  private _chart: ChartCmp;
  private _type : string;
  @Input() name:string;
  @Input() data:any[];

  constructor(type: string, chart: ChartCmp) {
    this._type = type;
    this._chart = chart;
  }

  ngAfterViewInit():void {
    this._chart.addSeries({
      type: this._type,
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
    super('line', chart);
  }
}

@Directive({selector: 'ng2-hc-area'})
export class AreaSeries extends AbstractHighchartSeries {

  constructor(@Host() chart: ChartCmp) {
    super('area', chart);
  }
}
