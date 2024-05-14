import { Component, Input } from '@angular/core';
import { Expense } from '../../models/expense';
import { Income } from '../../models/income';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent {
  title = 'Expense Tracker';
  chart: any;

  chartOptions = {
    animationEnabled: true,
    theme: 'light2',
    title: {
      text: 'Expense vs Income',
    },
    axisX: {
      valueFormatString: 'DD/MM/YYYY',
    },
    axisY: {
      title: '',
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: 'pointer',
      itemclick: function (e: any) {
        if (
          typeof e.dataSeries.visible === 'undefined' ||
          e.dataSeries.visible
        ) {
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        }
        e.chart.render();
      },
    },
    data: [
      {
        type: 'line',
        showInLegend: true,
        name: 'Expense',
        xValueFormatString: 'MMM DD, YYYY',
        dataPoints: this.mainService.allExpenses.map((e) => {
          return { x: new Date(e.date), y: +(e.amount ?? 0) };
        }),
      },
      {
        type: 'line',
        showInLegend: true,
        name: 'Income',
        dataPoints: this.mainService.allIncomes.map((e) => {
          return { x: new Date(e.date), y: +(e.amount ?? 0) };
        }),
      },
    ],
  };

  constructor(public mainService: MainService) {}
}
