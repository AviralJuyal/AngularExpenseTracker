import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Expense } from '../../models/expense';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
})
export class ExpensesComponent {
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
    'Travel',
    'Others',
  ];

  constructor(private toastr: ToastrService, public mainService: MainService) {}

  ngOnInit() {
    // const data = localStorage.getItem('allExpenses');
    // if (data) {
    //   this.mainService.allExpenses = JSON.parse(data);
    // }
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
      case 'Travel':
        iconText = 'backpack';
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
      this.mainService.allExpenses.push({
        ...this.expenseDetail,
        id: this.mainService.allExpenses.length,
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

      this.mainService.allItems = [
        ...this.mainService.allExpenses,
        ...this.mainService.allIncomes,
      ];
      localStorage.setItem(
        'allExpenses',
        JSON.stringify(this.mainService.allExpenses)
      );
    }
  }

  deleteExpense(id: number) {
    this.toastr.clear();
    this.mainService.allExpenses = this.mainService.allExpenses.filter(
      (expense) => expense.id !== id
    );
    this.toastr.success('Expense deleted successfully !');

    this.mainService.allItems = [
      ...this.mainService.allExpenses,
      ...this.mainService.allIncomes,
    ];

    localStorage.setItem(
      'allExpenses',
      JSON.stringify(this.mainService.allExpenses)
    );
  }
}
