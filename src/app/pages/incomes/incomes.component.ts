import { Component } from '@angular/core';
import { Income } from '../../models/income';
import { ToastrService } from 'ngx-toastr';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrl: './incomes.component.scss',
})
export class IncomesComponent {
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
    'Travel',
    'BankTransfers',
    'Others',
  ];

  constructor(private toastr: ToastrService, public mainService: MainService) {}

  ngOnInit() {
    // const data = localStorage.getItem('allIncomes');
    // if (data) {
    //   this.allIncomes = JSON.parse(data);
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
      this.mainService.allIncomes.push({
        ...this.incomeDetail,
        id: this.mainService.allIncomes.length,
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

      this.mainService.allItems = [
        ...this.mainService.allExpenses,
        ...this.mainService.allIncomes,
      ];

      localStorage.setItem(
        'allIncomes',
        JSON.stringify(this.mainService.allIncomes)
      );
    }
  }

  deleteIncome(id: number) {
    this.toastr.clear();
    this.mainService.allIncomes = this.mainService.allIncomes.filter(
      (income) => income.id !== id
    );

    this.toastr.success('Income deleted successfully !');

    this.mainService.allItems = [
      ...this.mainService.allExpenses,
      ...this.mainService.allIncomes,
    ];
    localStorage.setItem(
      'allIncomes',
      JSON.stringify(this.mainService.allIncomes)
    );
  }
}
