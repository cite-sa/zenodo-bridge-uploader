// import { Injectable } from '@angular/core';
// import { Observable, Subject } from 'rxjs';

// @Injectable()
// export class FileUrlService {

//   private fileUrls: string[] = [];
//   private fileUrlsToStore = new Subject<string[]>();

//   constructor() { }

//   public getFileUrlsObservable = (): Observable<string[]> => this.fileUrlsToStore.asObservable();

//   public addFileUrl(fileUrl: string): void {
//     this.fileUrls.push(fileUrl);
//     this.fileUrlsToStore.next(this.fileUrls);
//   }

//   public removeFileUrl(removeFileUrlPos): void {
//     this.fileUrls.splice(removeFileUrlPos, 1);
//     this.fileUrlsToStore.next(this.fileUrls);
//   }
// }
