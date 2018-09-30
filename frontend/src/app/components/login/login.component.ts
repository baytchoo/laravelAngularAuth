import { Component, OnInit } from '@angular/core';
import { ReqServiceService } from '../../Services/Req-Service.Service';

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

  constructor(private reqService : ReqServiceService) { }

  ngOnInit() {
  }

  onSubmit() {
  	return this.reqService.login(this.form).subscribe(
  		data => console.log(data),
  		error => this.handleError(error)
  	);
  }

  handleError(error){
    this.error = error.error.error;
  }

}
