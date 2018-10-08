import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styles: [],
})
export class GraficoComponent implements OnInit {

  // Doughnut
  @Input('ChartData') doughnutChartData: number[] = [];
  @Input('ChartLabels') doughnutChartLabels: string[] = [];
  @Input('ChartType') doughnutChartType: string = '';

  constructor() {}

  ngOnInit() {}
}
