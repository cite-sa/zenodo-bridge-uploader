import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { buildStringControl } from '../../zenodo-request/request-form/request-form-editor.model';
// import { FileUrlService } from 'src/app/service/files/file-url.service';

@Component({
	selector: 'app-file-url-list',
	templateUrl: './file-url-list.component.html',
	styleUrls: ['./file-url-list.component.scss']
})
export class FileUrlListComponent implements OnInit {

	@Input() form: FormArray = null;

	// urlList: string[] = [];
	// myForm: FormGroup;
	// url: FormControl;
	// constructor(private fileUrlService: FileUrlService) { }

	constructor() {
	}

	ngOnInit(): void {

	}

	deleteItem(index: number) {
		this.form.removeAt(index);
	}

	addItem() {
		this.form.push(buildStringControl(null, false, [Validators.required, Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]));
	}

	// ngOnInit(): void {
	//   this.fileUrlService.getFileUrlsObservable().subscribe(data => { this.urlList = data });
	//   this.createFormControls();
	//   this.createForm();
	// } 

	// createForm(): void {
	//   this.myForm = new FormGroup({
	//     url: this.url
	//   });
	// }
	// createFormControls(): void {
	//   const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
	//   this.url = new FormControl('', [Validators.required/*, Validators.pattern(urlRegex)*/]);
	// }
	// addFileUrl(): void {

	//   if (this.myForm.valid) {
	//     const url = this.myForm.value.url;
	//     this.fileUrlService.addFileUrl(url);
	//     this.myForm.reset()
	//   }
	// }
	// removeFileUrl(removePos): void {
	//   this.fileUrlService.removeFileUrl(removePos);
	// }
}
