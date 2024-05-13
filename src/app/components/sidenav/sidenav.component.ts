import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  constructor(private router: Router, private route: ActivatedRoute) {
    console.log(this.getCurrPath());
  }

  navigateFunc(path: string) {
    console.log(this.getCurrPath());
    this.router.navigateByUrl(path);
  }

  getCurrPath() {
    return this.router.url.split('/').join('');
  }

  clearData() {
    localStorage.clear();
    window.location.reload();
  }
}
