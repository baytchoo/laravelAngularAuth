import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	public loggeddInn : boolean;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  	this.authService.authStatus.subscribe(value => this.loggeddInn = value);
  }

}
