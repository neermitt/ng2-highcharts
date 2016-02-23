import {CONST_EXPR} from 'angular2/src/facade/lang';
import {ChartCmp} from './chart';
import {LineSeries, AreaSeries} from "./series";

export const HIGHCHART_DIRECTIVES = CONST_EXPR([ChartCmp, LineSeries, AreaSeries]);
