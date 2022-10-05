import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from 'src/app/common/base/base.component';
import { WebDavUser } from 'src/app/model/web-dav/user.model';



@Component({
  selector: 'app-web-dav-login-dialog',
  templateUrl: './web-dav-login-dialog.component.html',
  styleUrls: ['./web-dav-login-dialog.component.scss']
})
export class WebDavLoginDialogComponent extends BaseComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<WebDavLoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WebDavUser) {
    super();
  }
  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

