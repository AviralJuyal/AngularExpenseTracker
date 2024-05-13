import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  // @Input() openLoginModal!: () => void;
  // @Input() openRegisterModal!: Function;

  isLoggedIn = false;

  constructor(
    public userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  // ngOnInit() {
  //   this.userService.userInfo.asObservable().subscribe((res) => {
  //     if (res.passengerID) this.isLoggedIn = true;
  //   });
  // }

  handleNavigate(url = '/home') {
    this.router.navigateByUrl(url);
  }

  handleLogout() {
    localStorage.removeItem('userData');
    this.toastr.success('User logged out successfully');
  }
}
