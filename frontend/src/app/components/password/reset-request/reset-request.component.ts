import { Component, OnInit } from '@angular/core';
import { ReqServiceService } from '../../../Services/Req-Service.Service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-reset-request',
  templateUrl: './reset-request.component.html',
  styleUrls: ['./reset-request.component.css']
})
export class ResetRequestComponent implements OnInit {

	public form = {
		email: null
	};
	constructor(private reqService : ReqServiceService,
				private notify     : SnotifyService
		) { }

	ngOnInit() {
	}

	onSubmit() {
		this.notify.info('Please wait...' , { timeout:5000});
		this.reqService.sendPasswordResetLink(this.form).subscribe(
  			data => this.handleResponse(data),
  			error =>  this.notify.error(error.error.error)
  		);
	}

	handleResponse(data) {
		this.notify.success(data.data, {timeout:5000});
     	this.form.email = null;
  	}

}
