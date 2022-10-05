import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DepositRequestEditorModel } from '../ui/zenodo-request/request-form/request-form-editor.model';
import { ConfigurationService } from './configuration/configurationService';

@Injectable()
export class ZenodoService {

	constructor(
		private configurationService: ConfigurationService,
		private http: HttpClient) { }

	uploadDepositRequest(formData: FormData): Observable<String> {
		const url = this.configurationService.server + 'deposit/upload';

		return this.http.post<String>(url, formData).pipe(
			catchError((error: any) => throwError(error)));
	}
	updateDepositRequest(formData: FormData): Observable<String> {
		const url = this.configurationService.server + 'deposit/update';

		return this.http.post<String>(url, formData).pipe(
			catchError((error: any) => throwError(error)));
	}

	getDepostiRequestIsAsDraft(id: string): Observable<DepositRequestEditorModel> {
		const url = this.configurationService.server + 'deposit/' + id;
		return this.http.get<DepositRequestEditorModel>(url).pipe(
			catchError((error: any) => throwError(error)));
	}

	getCommunities(like?: string): Observable<ZenodoApiResponce<ZenodoApiCommunityResponse>> {
		let str = like == null ? '' : like;
		const url = this.configurationService.zenodoApiUrl + 'api/communities?page=1&size=100&q=' + str;
		return this.http.get<ZenodoApiResponce<ZenodoApiCommunityResponse>>(url).pipe(
			catchError((error: any) => throwError(error)));
	}

	getGrants(like?: string): Observable<ZenodoApiResponce<ZenodoApiGrantResponse>> {
		let str = like == null ? '' : like;
		const url = this.configurationService.zenodoApiUrl + 'api/grants?page=1&size=100&q=' + str;
		return this.http.get<ZenodoApiResponce<ZenodoApiGrantResponse>>(url).pipe(
			catchError((error: any) => throwError(error)));
	}

	getLicenses(like?: string): Observable<ZenodoApiResponce<ZenodoApiLicenseResponse>> {
		let str = like == null ? '' : like;
		const url = this.configurationService.zenodoApiUrl + 'api/licenses?page=1&size=100&q=' + str;
		return this.http.get<ZenodoApiResponce<ZenodoApiLicenseResponse>>(url).pipe(
			catchError((error: any) => throwError(error)));
	}
}

export interface ZenodoApiResponce<T> {
	hits: ZenodoApiHitsResponce<T>;
}

export interface ZenodoApiHitsResponce<T> {
	hits: T[];
	total: number;
}

export interface ZenodoApiCommunityResponse {
	description: string;
	id: string;
	title: string;
}

export interface ZenodoApiGrantResponse {
	id: string;
	metadata: MetadataGrant;
	name: string;
}

export interface MetadataGrant {
	funder: Funder;
}

export interface Funder {
	name: string;
}

export interface ZenodoApiLicenseResponse {
	id: string;
}

