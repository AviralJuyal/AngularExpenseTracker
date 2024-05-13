import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Expense } from '../../models/expense';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
})
export class ExpensesComponent {
  totalexpense: number = 4000;

  expenseDetail: Expense = {
    id: 0,
    title: '',
    amount: null,
    date: '',
    option: '',
    notes: '',
    type: 'expense',
  };

  options: string[] = [
    'Youtube',
    'Stocks',
    'Freelance',
    'Investments',
    'Salary',
    'BankTransfers',
    'Others',
  ];

  allexpenses: Expense[] = [];

  constructor(private toastr: ToastrService) {}

  ngOnInit() {
    const data = localStorage.getItem('allExpenses');
    if (data) {
      this.allexpenses = JSON.parse(data);
    }
  }

  getIconName(option: string): string {
    let iconText = '';
    switch (option) {
      case 'Youtube':
        iconText = 'youtube';
        break;
      case 'Stocks':
        iconText = 'graph-up';
        break;
      case 'Freelance':
        iconText = 'briefcase';
        break;
      case 'Investments':
        iconText = 'bank';
        break;
      case 'Salary':
        iconText = 'currency-dollar';
        break;
      case 'BankTransfers':
        iconText = 'arrow-left-right';
        break;
      case 'Others':
        iconText = 'three-dots';
        break;
    }
    return iconText;
  }

  addExpense() {
    this.toastr.clear();
    if (
      !this.expenseDetail.amount ||
      !this.expenseDetail.date ||
      this.expenseDetail.title === '' ||
      this.expenseDetail.option === ''
    ) {
      this.toastr.error('Please enter all details');
      return;
    } else {
      this.allexpenses.push({
        ...this.expenseDetail,
        id: this.allexpenses.length,
      });
      this.toastr.success('Expense added successfully !');
      this.expenseDetail = {
        id: 0,
        title: '',
        amount: null,
        date: '',
        option: '',
        notes: '',
        type: 'expense',
      };

      localStorage.setItem('allExpenses', JSON.stringify(this.allexpenses));
    }
  }

  deleteExpense(id: number) {
    this.toastr.clear();
    this.allexpenses = this.allexpenses.filter((expense) => expense.id !== id);
    this.toastr.success('Expense deleted successfully !');
    localStorage.setItem('allExpenses', JSON.stringify(this.allexpenses));
  }

  getTotalExpense(): number {
    return this.allexpenses.reduce(
      (total, expense) => total - (expense.amount ?? 0),
      0
    );
  }
}
