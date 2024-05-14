import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  constructor(private router: Router, public mainService: MainService) {}

  navigateFunc(path: string) {
    this.router.navigateByUrl(path);
  }

  getCurrPath() {
    return this.router.url.split('/').join('');
  }

  clearData() {
    localStorage.clear();
    this.mainService.allExpenses = [];
    this.mainService.allIncomes = [];
    this.mainService.allItems = [];
  }
}
