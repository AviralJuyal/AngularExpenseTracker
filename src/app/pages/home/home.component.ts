import { Component } from '@angular/core';
import { Expense } from '../../models/expense';
import { Income } from '../../models/income';

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

  chartOptions!: any;

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
      (total, income) => total + (income.amount ?? 0),
      0
    );
  }

  getTotalExpense() {
    return this.allExpenses.reduce(
      (total, expense) => total + (expense.amount ?? 0),
      0
    );
  }

  getTotalBalance() {
    return this.getTotalIncome() - this.getTotalExpense();
  }
}
