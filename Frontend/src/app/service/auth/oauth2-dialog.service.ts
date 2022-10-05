import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseService } from '../base.service';
import { ConfigurationService } from '../configuration/configurationService';

@Injectable()
export class Oauth2DialogService extends BaseService{

	private code: BehaviorSubject<any> = new BehaviorSubject(undefined);

	constructor(private configurationService: ConfigurationService) {
		super();
	}

	public registerCode(code: string) {
		this.code.next(code);
	}

	public login(url: string): Observable<any> {
		const windows = window.open(this.configurationService.app + 'oauth2?url=' + encodeURIComponent(url) ,'', `height=500px,width=500px,top=${(window.screen.height / 2) - 200}px,left=${(window.screen.width / 2) - 200}px`);
		const sub = interval(300).pipe(takeUntil(this._destroyed)).subscribe(() => {
			if (windows.closed) {
				let oauthCode;
				let oauthState;
				let oauthToken;
				let oauthVerifier;
				if (localStorage.getItem('oauthCode')) {
					oauthCode = localStorage.getItem('oauthCode');
					localStorage.removeItem('oauthCode');
				}
				if (localStorage.getItem('oauthState')) {
					oauthState = localStorage.getItem('oauthState');
					localStorage.removeItem('oauthState');
				}
				if (localStorage.getItem('oauthObject')) {
					const oauthObject = JSON.parse(localStorage.getItem('oauthObject'));
					localStorage.removeItem('oauthObject');
					oauthToken = oauthObject.oauth_token;
					oauthVerifier = oauthObject.oauth_verifier;
				}
				this.code.next({oauthCode: oauthCode, oauthState: oauthState, oauthToken: oauthToken, oauthVerifier: oauthVerifier});
				this.code.next(undefined);
				sub.unsubscribe();
			}
		});
		return this.code.asObservable();
	}

}
