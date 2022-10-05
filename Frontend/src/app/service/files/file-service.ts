import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ServerResponse } from 'src/app/model/response/ServerResponse';
import { Metadata } from 'src/app/model/zenodo/deposit.request.model';
import { BaseService } from '../base.service';
import { ConfigurationService } from '../configuration/configurationService';

@Injectable()
export class FileService extends BaseService {

  constructor(
    private configurationService: ConfigurationService,
    private http: HttpClient) {
    super();
  }

  uploadFile(formData: FormData): Observable<ServerResponse> {
    const url = this.configurationService.server + 'storage/files';
    return this.http.post<ServerResponse>(url, formData).pipe(
      catchError((error: any) => throwError(error)));
  }
  getMetadataFromFile(formData: FormData): Observable<Metadata> {
    const url = this.configurationService.server + 'storage/files/metadata';

    return this.http.post<Metadata>(url, formData).pipe(
      catchError((error: any) => throwError(error)));
  }
}
