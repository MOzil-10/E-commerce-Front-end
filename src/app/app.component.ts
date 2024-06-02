import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthStateServiceService } from './services/auth/auth-state-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Ecommerce';

  // Flags to determine if a customer or admin is logged in
  isCustomerLoggedIn: boolean = false;
  isAdminLoggedIn: boolean = false;

  // Inject Router and AuthStateService into the component
  constructor(private router: Router, private authStateService: AuthStateServiceService) {}

  // Lifecycle hook that runs after the component's view has been initialized
  ngOnInit() {
    // Initial check of login status
    this.updateLoginStatus();
    // Subscribe to router events to update login status on navigation changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateLoginStatus();
      }
    });
  }

  // Method to update login status
  updateLoginStatus() {
    this.authStateService.getUser().subscribe(user => {
      console.log('User object in updateLoginStatus:', user); // Log the user object
      if (user !== null && user !== undefined) {
        this.isCustomerLoggedIn = user.role === 'CUSTOMER';
        this.isAdminLoggedIn = user.role === 'ADMIN';
      } else {
        this.isCustomerLoggedIn = false;
        this.isAdminLoggedIn = false;
      }
    });
  }  
  
  // Method to handle user logout and navigate to the login page
  logout() {
    this.authStateService.clear();
    this.router.navigateByUrl('/login');
  }
}
