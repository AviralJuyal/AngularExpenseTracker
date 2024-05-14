import { Component } from '@angular/core';
import { Expense } from '../../models/expense';
import { Income } from '../../models/income';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  allExpenses: Expense[] = [];
  allIncomes: Income[] = [];

  allItems: Income[] = [];

  constructor() {}

  data: any;

  ngOnInit() {
    let expData = localStorage.getItem('allExpenses');
    let incomeData = localStorage.getItem('allIncomes');
    if (expData) {
      this.allExpenses = JSON.parse(expData);
      // Sort expenses by date in descending order
      this.allExpenses.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
    if (incomeData) {
      this.allIncomes = JSON.parse(incomeData);
      // Sort incomes by date in descending order
      this.allIncomes.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }

    this.allItems = [...this.allExpenses, ...this.allIncomes];
    this.allItems
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .splice(5);
  }

  getTotalIncome() {
    return this.allIncomes.reduce(
      (total, income) => total + +(income.amount ?? 0),
      0
    );
  }

  getTotalExpense() {
    return this.allExpenses.reduce(
      (total, expense) => total + +(expense.amount ?? 0),
      0
    );
  }

  getTotalBalance() {
    return this.getTotalIncome() - this.getTotalExpense();
  }

  onFileChange(event: any) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      reader.readAsText(file);

      reader.onload = () => {
        const csvData = reader.result;
        const parsedData = Papa.parse(csvData as string, {
          header: true,
          skipEmptyLines: true,
        });

        this.data = parsedData.data;

        this.allExpenses = [
          ...this.allExpenses,
          ...this.data
            .filter((item: any) => item.type.toLowerCase() === 'expense')
            .sort(
              (a: Income, b: Income) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            ),
        ];

        this.allIncomes = [
          ...this.allIncomes,
          ...this.data
            .filter((item: any) => item.type.toLowerCase() === 'income')
            .sort(
              (a: Income, b: Income) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            ),
        ];

        this.allItems = [...this.allExpenses, ...this.allIncomes];
        this.allItems
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .splice(5);

        localStorage.setItem('allExpenses', JSON.stringify(this.allExpenses));
        localStorage.setItem('allIncomes', JSON.stringify(this.allIncomes));
      };

      reader.onerror = (error) => {
        console.error('Error occurred while reading file:', error);
      };
    }
  }
}
