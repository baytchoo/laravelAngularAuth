import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { ReqServiceService } from '../../../Services/Req-Service.Service';
import { SnotifyService } from 'ng-snotify';



@Component({
  selector: 'app-reset-response',
  templateUrl: './reset-response.component.html',
  styleUrls: ['./reset-response.component.css']
})
export class ResetResponseComponent implements OnInit {

	public error = [];

	public form = {
		email: null,
		password: null,
		password_confirmation: null,
		resetToken: null
	};
  constructor(private activatedRoute : ActivatedRoute,
  				private reqService : ReqServiceService,
  				private notify : SnotifyService,
          private router : Router
  	) {
  	activatedRoute.queryParams.subscribe(params => {
  		this.form.resetToken = params['token']
  	});
   }

  ngOnInit() {
  }

  onSubmit() {
  	this.reqService.changePassword(this.form).subscribe(
  		data => this.handleResponse(data),
  		error =>  this.handleError(error.error.errors)
  	);
  }

  handleResponse(data) {
    let _router = this.router;
    this.notify.confirm('Done! Login with new password' , 
        {
          buttons:[
            {text: 'Ok', action: toster => {_router.navigateByUrl('/login'), this.notify.remove(toster.id)}}
          ]
        }
      );
		  ;
  	}

    handleError(error) {
      this.error = error;
    }
}
