import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ChartType, ChartEvent } from 'ng-chartist/dist/chartist.component';
import * as Chartist from 'chartist';
import * as c3 from 'c3';

declare var require: any;

const data: any = require('./data.json');

interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css']
})
export class DashboardsComponent implements AfterViewInit {

  constructor() { }
  
  ngAfterViewInit() {
    const chart = c3.generate({
      bindto: '#visitor',
      data: {
        columns: [
          ['Aceptados', 75],
          ['Rechazados', 10],
          ['Pendientes', 5],
          ['Nuevos', 5]
        ],
        type: 'donut'
      },
      donut: {
        label: {
          show: false
        },
        title: 'Estatus de documentos',
        width: 35
      },
      legend: {
        hide: true
      },
      color: {
        pattern: ['#40c4ff', '#2961ff', '#ff821c', '#7e74fb']
      }
    });
  }
}
