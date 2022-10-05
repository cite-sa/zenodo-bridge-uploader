import { Component, Input } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatListOption } from '@angular/material/list';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/common/base/base.component';
import { WebDavUser } from 'src/app/model/web-dav/user.model';
import { FileItem, WebDavFileList } from 'src/app/model/web-dav/xml/fileItem.model';
import { FileViewManagerService } from 'src/app/service/web-dav/file-view-manager.service';
import { RemoteAccessService } from 'src/app/service/web-dav/remote-access.service';
import { WebDavUrlEditorModel } from '../../zenodo-request/request-form/request-form-editor.model';
import { WebDavLoginDialogComponent } from './web-dav-login-dialog/web-dav-login-dialog.component';

@Component({
	selector: 'app-web-dav',
	templateUrl: './web-dav.component.html',
	styleUrls: ['./web-dav.component.scss']
})
export class WebDavComponent extends BaseComponent {

	@Input() form: FormArray = null;
	@Input() showWebDavConnect: boolean;

	fileList: WebDavFileList = new WebDavFileList();
	currentDepth: number;
	webDavUser: WebDavUser;
	constructor(
		private webDavService: RemoteAccessService,
		private fileViewMangerService: FileViewManagerService,
		public dialog: MatDialog) {
		super();

	}
	ngOnInit(): void {
	}
	onSelcted(options: MatListOption[]) {
		let selectedFile: FileItem;

		options.map(o => selectedFile = o.value);
		if (!selectedFile.isFolder) { return; }

		this.webDavService.getProperties(selectedFile.href)
			.pipe(takeUntil(this._destroyed))
			.subscribe(result => {
				const webDavFileList = result as WebDavFileList;
				this.fileList = webDavFileList;
				this.fileViewMangerService.findNext(this.fileList.curentFolder);
				this.currentDepth = this.fileViewMangerService.depth;
			});

	}
	navigateUp(): void {
		this.webDavService.getProperties(this.fileViewMangerService.getParentFolder())
			.pipe(takeUntil(this._destroyed))
			.subscribe(result => {
				const webDavFileList = result as WebDavFileList;
				this.fileList = webDavFileList;
				this.fileViewMangerService.findPrevious(this.fileList.curentFolder);
				this.currentDepth = this.fileViewMangerService.depth;
			});

	}
	openDialog(): void {

		const dialogRef = this.dialog.open(WebDavLoginDialogComponent, {
			width: '450px',
			height: '450px',
			data: new WebDavUser()
		});

		dialogRef.afterClosed().pipe(takeUntil(this._destroyed))
			.subscribe(result => {
				if (result === undefined || result === null) { return; }
				this.webDavUser = result;

				this.webDavService.initFolfer(this.webDavUser)
					.pipe(takeUntil(this._destroyed))
					.subscribe(result => {
						const webDavFileList = result as WebDavFileList;
						this.fileList = webDavFileList;
						this.fileViewMangerService.initTree(this.fileList.curentFolder);
						this.currentDepth = this.fileViewMangerService.depth;
					});
			});
	}


	addWebDavFileUrl(file: FileItem) {
		// this.form.push(new )
		file.href = decodeURIComponent(file.href);
		const formArrayRefs = (this.form.value as FileItem[]).map(x => x.href);
		if (!formArrayRefs.includes(file.href)) {
			this.form.push(this.mapFileItemUrlToWebDavUrl(file).buildForm());
		}
	}

	public mapFileItemUrlToWebDavUrl(file: FileItem): WebDavUrlEditorModel {
		let webDavUrl: WebDavUrlEditorModel = new WebDavUrlEditorModel();
		webDavUrl.url = file.user.url + file.href;
		webDavUrl.username = file.user.userName;
		webDavUrl.password = file.user.password
		return webDavUrl;
	}

}
