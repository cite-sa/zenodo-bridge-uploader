import {  Injectable } from "@angular/core";
import { BaseComponent } from "src/app/common/base/base.component";
import { HttpClient } from '@angular/common/http';
import { catchError, takeUntil } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { ZenodoConfiguration } from "../../model/configuration/zenodo-configuration";

@Injectable({
    providedIn: 'root'
})
export class ConfigurationService extends BaseComponent{

    constructor(private http:HttpClient){ super(); }

    private _server:string;
    get server():string{
        return this._server;
    }

    private _app:string;
    get app():string{
        return this._app;
    }

	private _zenodoApiUrl:string;
    get zenodoApiUrl():string{
        return this._zenodoApiUrl;
    }

    private _defaultCulture:string;
    get defaultCulture():string{
        return this._defaultCulture;
    }

    private _zenodoConfiguration:ZenodoConfiguration;
    get zenodoConfiguration():ZenodoConfiguration{
        return this._zenodoConfiguration;
    }

	private _privacyStatementUrl: string;
	get privacyStatementUrl(): string {
		return this._privacyStatementUrl;
	}

	private _termsOfUseUrl: string;
	get termsOfUseUrl(): string {
		return this._termsOfUseUrl;
	}

    public loadConfiguration(): Promise<any>{
        return new Promise((r, e) => {
			this.http.get('./assets/config/config.json').pipe(catchError((err: any, caught: Observable<any>) => throwError(err)))
				.pipe(takeUntil(this._destroyed))
				.subscribe(
					(content: ConfigurationService) => {
						this.parseResponse(content);
						r(this);
					},
					reason => e(reason));
		});
    }
    private parseResponse(config: any) {
		this._server = config.server;
		this._app = config.App;
		this._zenodoApiUrl = config.ZenodoApiUrl;
		this._defaultCulture = config.defaultCulture;
		this._zenodoConfiguration = config.loginProvider.zenodoConfiguration;		
		this._privacyStatementUrl = config.privacyStatementUrl;
		this._termsOfUseUrl = config.termsOfUseUrl;
	}
}