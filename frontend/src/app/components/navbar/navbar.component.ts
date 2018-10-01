import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../../Services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	public loggeddInn : boolean;
  constructor(private authService: AuthService,
  				private router : Router,
  				private tokenService : TokenService) { }

  ngOnInit() {
  	this.authService.authStatus.subscribe(value => this.loggeddInn = value);
  }

  logout(event : MouseEvent) {
  	event.preventDefault();
     this.tokenService.remove();
  	  this.authService.changeAuthStatus(false);
     this.router.navigateByUrl('/login');
  }

}
