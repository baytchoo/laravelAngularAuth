import { Component, OnInit } from '@angular/core';
import { ReqServiceService } from '../../Services/Req-Service.Service';
import { TokenService } from '../../Services/token.service';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	public form = {
		email: null,
		password: null
	};

  public error = null;

  constructor(private reqService : ReqServiceService,
              private tokenService : TokenService,
              private router : Router,
              private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
  	return this.reqService.login(this.form).subscribe(
  		data => this.handleResponse(data),
  		error => this.handleError(error)
  	);
  }

  handleError(error){
    this.error = error.error.error;
  }

  handleResponse(data) {
     this.tokenService.handle(data.access_token);
     this.authService.changeAuthStatus(true);
     this.router.navigateByUrl('/profile');
  }

}
