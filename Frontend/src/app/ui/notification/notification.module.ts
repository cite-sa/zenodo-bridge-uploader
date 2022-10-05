import { NgModule } from '@angular/core';
import { NotificationComponent } from './notification.component';
import { PopupNotificationDialogComponent } from './popup/popup-notification.component';
import { SnackBarNotificationComponent } from './snack-bar/snack-bar-notification.component';
import {MatDialogModule} from '@angular/material/dialog'; 
import { TranslateModule } from '@ngx-translate/core';
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
@NgModule({
	imports: [
		MatDialogModule,TranslateModule,MatSnackBarModule
	],
	declarations: [
		NotificationComponent,
		SnackBarNotificationComponent,
		PopupNotificationDialogComponent,
	],
	exports: [
		NotificationComponent
	],
	entryComponents: [
		SnackBarNotificationComponent,
		PopupNotificationDialogComponent,
	]
})
export class NotificationModule {
	constructor() { }
}
