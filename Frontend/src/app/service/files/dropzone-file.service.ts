// import { Injectable } from '@angular/core';
// import { Observable, Subject } from 'rxjs';
// import { BaseService } from '../base.service';

// @Injectable()
// export class DropzoneFileService extends BaseService {

//   private files:File[] = [];
//   private filesToStore = new Subject<File[]>();

//   constructor() {
//     super();
//   }

// 	public getFilesToStoreObservable = (): Observable<File[]> => this.filesToStore.asObservable();

//   public addFiles(addedFiles: File[]):void{
//     this.files.push(...addedFiles);
//     this.filesToStore.next(this.files);
//   }

//   public removeFile(removeFile):void{
//     this.files.splice(this.files.indexOf(removeFile), 1);
//     this.filesToStore.next(this.files);
//   }
// }
