import { Component, Input } from '@angular/core';
import { Income } from '../../models/income';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrl: './piechart.component.scss',
})
export class PiechartComponent {
  @Input() data: Income[] = [];

  @Input() totalData!: number;

  @Input() title!: string;

  chartOptions = {};

  ngOnInit() {
    // Expense pie chart
    this.chartOptions = {
      animationEnabled: true,
      theme: 'dark2',
      exportEnabled: true,
      title: {
        text: this.title,
      },

      data: [
        {
          type: 'pie', // You can change this to any other supported type like 'column', 'line', etc.
          indexLabel: '{name}: {y}%',
          dataPoints: (() => {
            const totals: Record<string, number> = {}; // Explicitly typing the object
            this.data.forEach((expense) => {
              if (totals[expense.option]) {
                totals[expense.option] += expense.amount ?? 0;
              } else {
                totals[expense.option] = expense.amount ?? 0;
              }
            });

            const totalExpense = this.totalData;
            return Object.keys(totals).map((option) => ({
              name: option,
              y: Math.round((totals[option] / totalExpense) * 100),
            }));
          })(),
        },
      ],
    };
  }
}
