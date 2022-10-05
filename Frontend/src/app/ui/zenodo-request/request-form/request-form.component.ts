import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map, takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/common/base/base.component';
import { Principal } from 'src/app/model/auth/principal';
import { ServerResponse } from 'src/app/model/response/ServerResponse';
import { Metadata, StorageFile } from 'src/app/model/zenodo/deposit.request.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { FileService } from 'src/app/service/files/file-service';
import { FormUtilsService } from 'src/app/service/helpers/form.utils.service';
import { MessageService } from 'src/app/service/helpers/message.service';
import { ZenodoService } from 'src/app/service/Zenodo-service';
import { DepositRequestEditorModel, MetadataEditorModel, StorageFileEditorModel, WebDavUrlEditorModel } from './request-form-editor.model';


@Component({
	selector: 'app-request-form',
	templateUrl: './request-form.component.html',
	styleUrls: ['./request-form.component.css']
})

export class RequestFormComponent extends BaseComponent implements OnInit {

	public editorModel: DepositRequestEditorModel;
	public formGroup!: FormGroup;
	public panelOpenState: boolean = true;
	public principal: Principal;
	public fileMetadata: FormControl;
	public color: ThemePalette = 'primary';
	public id: string;


	constructor(
		private formBuilder: FormBuilder,
		private fileService: FileService,
		private depositService: ZenodoService,
		private authService: AuthService,
		// private fileUrlsService: FileUrlService,
		private messageService: MessageService,
		private formUtilsService: FormUtilsService,
		protected language: TranslateService,
		private route: ActivatedRoute,
		private router: Router
	) {
		super();

	}

	ngOnInit(): void {
		this.route.paramMap.pipe(takeUntil(this._destroyed)).subscribe(params => {
			if (params.has('id')) {
				this.id = params.get('id');
				this.depositService.getDepostiRequestIsAsDraft(this.id).pipe(takeUntil(this._destroyed))
					.subscribe((response: any) => this.prepareForm(response), error => this.messageService.onCallbackError(error));
			} else {
				this.prepareForm(null);
			}
		});

		// if (this.authService.current()) { this.principal = this.authService.current() };
		this.authService.getPrincipalObservable().subscribe(data => {
			this.principal = data;
		});
		this.fileMetadata = new FormControl();
		this.fileMetadata.valueChanges.subscribe((files: File) => {
			const formMetadata: FormData = this.formUtilsService.getFormDataWithFiles([files]);
			this.fileService.getMetadataFromFile(formMetadata).pipe(takeUntil(this._destroyed))
				.subscribe(
					(metadata: Metadata) => {
						this.editorModel.deposit_metadata = new MetadataEditorModel().fromModel(metadata);
						this.formGroup.removeControl('deposit_metadata');
						this.formGroup.addControl('deposit_metadata', this.editorModel.deposit_metadata.buildForm(this.editorModel.validationContext));
						this.formGroup = this.editorModel.buildForm();

						// this.formUtilsService.metadataForm(metadata, this.formGroup);
						this.messageService.onCallbackSuccess(this.language.instant('APP.SUCCESS.SUCCESS-UPLOAD-FILE'));
					},
					error => {
						this.messageService.onCallbackError(error);
					}
				);
		});
	}

	prepareForm(response: any) {
		this.editorModel = new DepositRequestEditorModel().fromModel(response?.body);
		this.formGroup = this.editorModel.buildForm();
	}

	formSubmit(): void {

		// const formvalues = this.formGroup.value;
		// formvalues.storeFiles = this.storeFiles;
		// formvalues.fileUrls = this.fileUrlsToStore;
		// formvalues.metadata = this.formGroup.value;
		// formvalues.web_dav_urls = this.webDavUrlsToStore

		// let depositModel = this.formUtilsService.DepositModelFromForm(formvalues);

		this.uploadRequestWithUploadedFiles().pipe(takeUntil(this._destroyed)).subscribe(flag => this.uploadRequest(), uploadError => this.messageService.onCallbackError(uploadError));
	}

	uploadRequest(): void {
		const formData = this.formGroup.getRawValue();
		if (formData?.deposit_metadata?.communities?.length) {
			let communities = formData.deposit_metadata.communities.map(x => ({ identifier: x.value.id }));
			formData.deposit_metadata.communities = communities;
		}
		if (formData?.deposit_metadata?.grants?.length) {
			let grants = formData.deposit_metadata.grants.map(x => ({ id: x.value.id }));
			formData.deposit_metadata.grants = grants;
		}
		const postBody = new FormData();

		postBody.append("metadata", JSON.stringify(formData));
		postBody.append("principal", JSON.stringify(this.principal));
		postBody.append("id", this.id);

		this.persist(postBody).pipe(takeUntil(this._destroyed))
			.subscribe(x => this.router.navigate(['/upload-success']),
				error => this.messageService.onCallbackError(error));
	}

	persist(formData: any): Observable<any> {
		return this.id == null ? this.depositService.uploadDepositRequest(formData).pipe(takeUntil(this._destroyed)) :
			this.depositService.updateDepositRequest(formData).pipe(takeUntil(this._destroyed))
	}

	uploadRequestWithUploadedFiles(): Observable<any> {
		return !this.formGroup.get('filesToUpload')?.value?.length ? of(true) : this.fileService.uploadFile(this.formUtilsService.getFormDataWithFiles(this.formGroup.get('filesToUpload')?.value))
			.pipe(map((response: ServerResponse) => {
				let fileModels = (response.body as StorageFile[])?.map(x => new StorageFileEditorModel().fromModel(x));
				let fileFormArray = new Array<FormGroup>();
				if (fileModels) {
					fileModels.forEach(element => fileFormArray.push(element.buildForm()))
				}
				this.formGroup.removeControl('files');
				this.formGroup.addControl('files', this.formBuilder.array(fileFormArray));
				return of(true);
			}));
	}

	authorize = (): void => this.authService.zenodoLogin();
}
