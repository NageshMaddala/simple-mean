import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  loggedInUserEmail: string;
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.loggedInUserEmail = this.authService.getLoggedInUserEmail();
      });
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }

  // clear token
  // inform all parts of page
  onLogout(): void {
    this.authService.logout();
  }

  onShowUserInfo(): void {
    // Do nothing for now
  }
}
