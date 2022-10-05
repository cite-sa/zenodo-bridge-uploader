export class ZenodoConfiguration {

	private _clientId: string;
	get clientId(): string {
		return this._clientId;
	}

	private _oauthUrl: string;
	get oauthUrl(): string {
		return this._oauthUrl;
	}

	private _redirectUri: string;
	get redirectUri(): string {
		return this._redirectUri;
	}

}
