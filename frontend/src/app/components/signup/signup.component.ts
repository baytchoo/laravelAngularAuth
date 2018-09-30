import { Component, OnInit } from '@angular/core';
import { ReqServiceService }  from '../../Services/Req-Service.Service';
import { TokenService } from '../../Services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

	public form ={
		'email' : null,
		'name' : null,
		'password':	null,
		'password_confirmation': null
	}

	public error = [];

  	constructor(private reqService : ReqServiceService,
              private tokenService : TokenService,
              private router : Router) { }

  	ngOnInit() {
  	}

  	onSubmit() {
  		return this.reqService.signup(this.form).subscribe(
  			data => this.handleResponse(data),
  			error => this.handleError(error)
  		);
  	}

  	handleError(error){
    	this.error = error.error.errors;
  	}

   handleResponse(data) {
     this.tokenService.handle(data.access_token);
     this.router.navigateByUrl('/profile');
  }

}
