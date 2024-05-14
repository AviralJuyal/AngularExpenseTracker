import { Component } from '@angular/core';
import { Expense } from '../../models/expense';
import { Income } from '../../models/income';
import * as Papa from 'papaparse';
import { ToastrService } from 'ngx-toastr';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private toastr: ToastrService, public mainService: MainService) {}

  data: any;

  ngOnInit() {}

  onFileChange(event: any) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      reader.readAsText(file);

      reader.onload = () => {
        try {
          const csvData = reader.result;
          const parsedData = Papa.parse(csvData as string, {
            header: true,
            skipEmptyLines: true,
          });

          this.data = parsedData.data;

          this.mainService.allExpenses = [
            ...this.mainService.allExpenses,
            ...this.data.filter(
              (item: any) => item.type.toLowerCase() === 'expense'
            ),
          ].sort(
            (a: Income, b: Income) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          );

          this.mainService.allIncomes = [
            ...this.mainService.allIncomes,
            ...this.data.filter(
              (item: any) => item.type.toLowerCase() === 'income'
            ),
          ].sort(
            (a: Income, b: Income) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          );

          this.mainService.allItems = [
            ...this.mainService.allExpenses,
            ...this.mainService.allIncomes,
          ];
          this.mainService.allItems
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .splice(5);

          localStorage.setItem(
            'allExpenses',
            JSON.stringify(this.mainService.allExpenses)
          );
          localStorage.setItem(
            'allIncomes',
            JSON.stringify(this.mainService.allIncomes)
          );
          this.toastr.success('Data loaded successfully');
        } catch (error) {
          this.toastr.error(
            'Invalid file you should include "id, title, amount, date, option, type and notes(optional)"'
          );
        }
      };

      reader.onerror = (error) => {
        console.error('Error occurred while reading file:', error);
        this.toastr.error('Error occurred while reading file');
      };
    }
  }
}
