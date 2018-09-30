import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

	private loggenIn = new BehaviorSubject<boolean> (this.token.loggedIn());
	authStatus = this.loggenIn.asObservable();

	constructor(private token : TokenService) { }

	changeAuthStatus(value : boolean) {
		this.loggenIn.next(value);
	}
}
