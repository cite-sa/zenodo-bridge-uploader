import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Observable, of, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Principal } from "src/app/model/auth/principal";
import { ZenodoToken } from "src/app/model/zenodo/zenodo-token.model";
import { BaseService } from "../base.service";
import { ConfigurationService } from "../configuration/configurationService";
import { MessageService } from "../helpers/message.service";
import { Oauth2DialogService } from "./oauth2-dialog.service";

@Injectable()
export class AuthService extends BaseService {

	private oauthLock: boolean;
	private zenodoToken: ZenodoToken;
	public completeAuth: boolean;
	private principalSubject = new Subject<Principal>();

	constructor(
		private configurationService: ConfigurationService,
		private oauth2DialogService: Oauth2DialogService,
		private httpClient: HttpClient,
		private router: Router,
		private messageService: MessageService,
		private language: TranslateService) {
		super();
	}

	public getPrincipalObservable = (): Observable<Principal> => this.principalSubject.asObservable();


	// public current(principal?: Principal): Principal {
	// 	if (principal) {
	// 		//localStorage.setItem('principal', JSON.stringify(principal));
	// 		this.principalSubject.next(principal);
	// 		return principal;
	// 	}
	// 	const principalJson = localStorage.getItem('principal');
	// 	if (principalJson === null || principalJson === undefined) {
	// 		this.principalSubject.next(null);
	// 		return null;
	// 	}
	// 	let principalObj = JSON.parse(principalJson) as Principal;
	// 	this.principalSubject.next(principalObj);
	// 	principalObj.expiresAt = new Date(principalObj.expiresAt);
	// 	if (principalObj.expiresAt < new Date()) {
	// 		this.principalSubject.next(null);
	// 		return null;
	// 	}

	// 	return principalObj;
	// }
	// public me(): Observable<Principal> {

	// 	const principal = this.current();
	// 	if (!principal) {
	// 		this.clear();
	// 		return of<Principal>();
	// 	}
	// 	return of<Principal>(principal);
	// }

	public zenodoLogin(): void {
		this.completeAuth = false;
		this.oauth2DialogService.login(this.getZenodoUrl()).pipe(takeUntil(this._destroyed))
			.subscribe(result => {
				if (result !== undefined) {
					if (!this.oauthLock) {
						this.zenodoLoginUser(result.oauthCode);
						this.oauthLock = true;
					}
				} else {
					this.oauthLock = false;
				}
			});

	}
	public zenodoLoginUser(code: string) {
		let headers = new HttpHeaders();
		headers = headers.set('Content-Type', 'application/json');
		headers = headers.set('Accept', 'application/json');
		this.httpClient.post(this.configurationService.server + 'auth/zenodoRequestToken', { code: code }, { headers: headers })
			.pipe(takeUntil(this._destroyed))
			.subscribe(
				(responseData: any) => {

					this.zenodoToken = new ZenodoToken();
					this.zenodoToken.userId = responseData.body.userId;
					this.zenodoToken.expiresAt = responseData.body.expiresAt;
					this.zenodoToken.accessToken = responseData.body.accessToken;
					this.zenodoToken.email = responseData.body.email;
					this.zenodoToken.refreshToken = responseData.body.refreshToken;
					this.principalSubject.next(this.zenodoToken as Principal);
					//this.current(this.zenodoToken as Principal);
					this.onAuthSuccess();
				},
				(error) => {
					this.onLogInError(error);
					console.log(error)
				});

	}
	private getZenodoUrl() {
		return this.configurationService.zenodoConfiguration.oauthUrl
			+ '?client_id='
			+ this.configurationService.zenodoConfiguration.clientId
			+ '&response_type=code&scope=deposit:write+deposit:actions+user:email&state=astate&redirect_uri='
			+ this.configurationService.zenodoConfiguration.redirectUri;
	}
	private clear(): void {
		localStorage.removeItem('principal');
	}
	private onAuthSuccess() {
		this.messageService.onCallbackSuccess(this.language.instant('APP.SNACK-BAR.SUCCESSFUL-LOGIN'));
	}
	private onLogInError(errorMessage: string) {
		this.messageService.onCallbackError(this.language.instant('APP.SNACK-BAR.UNSUCCESSFUL-LOGIN'));

	}
}

