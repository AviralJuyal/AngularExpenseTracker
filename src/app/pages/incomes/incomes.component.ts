import { Component } from '@angular/core';
import { Income } from '../../models/income';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrl: './incomes.component.scss',
})
export class IncomesComponent {
  totalIncome: number = 4000;

  incomeDetail: Income = {
    id: 0,
    title: '',
    amount: null,
    date: '',
    option: '',
    notes: '',
    type: 'income',
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

  allIncomes: Income[] = [];

  constructor(private toastr: ToastrService) {}

  ngOnInit() {
    const data = localStorage.getItem('allIncomes');
    if (data) {
      this.allIncomes = JSON.parse(data);
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

  addIncome() {
    this.toastr.clear();
    if (
      !this.incomeDetail.amount ||
      !this.incomeDetail.date ||
      this.incomeDetail.title === '' ||
      this.incomeDetail.option === ''
    ) {
      this.toastr.error('Please enter all details');
      return;
    } else {
      this.allIncomes.push({
        ...this.incomeDetail,
        id: this.allIncomes.length,
      });
      this.toastr.success('Income added successfully !');
      this.incomeDetail = {
        id: 0,
        title: '',
        amount: null,
        date: '',
        option: '',
        notes: '',
        type: 'income',
      };

      localStorage.setItem('allIncomes', JSON.stringify(this.allIncomes));
    }
  }

  deleteIncome(id: number) {
    this.toastr.clear();
    this.allIncomes = this.allIncomes.filter((income) => income.id !== id);
    this.toastr.success('Income deleted successfully !');
    localStorage.setItem('allIncomes', JSON.stringify(this.allIncomes));
  }

  getTotalIncome(): number {
    return this.allIncomes.reduce(
      (total, income) => total + (income.amount ?? 0),
      0
    );
  }
}
