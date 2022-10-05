// import { Injectable } from '@angular/core';
// import { Observable, Subject } from 'rxjs';
// import { FileItem } from 'src/app/model/web-dav/xml/fileItem.model';

// @Injectable()
// export class FileWebDavUrlService {

// 	private fileUrls: FileItem[] = [];
// 	private fileUrlsToStore = new Subject<FileItem[]>();

// 	constructor() { }

// 	public getWebDavFileUrlsObservable = (): Observable<FileItem[]> => this.fileUrlsToStore.asObservable();

// 	public removeFileUrl(removeFileUrlPos): void {
// 		this.fileUrls.splice(removeFileUrlPos, 1);
// 		this.fileUrlsToStore.next(this.fileUrls);
// 	}
// }
