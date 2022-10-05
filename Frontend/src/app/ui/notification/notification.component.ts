import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/common/base/base.component';
import { UiNotificationService, UiNotificationType, SnackBarNotification, PopupNotification, SnackBarNotificationLevel } from 'src/app/service/notification/ui-notification-service';


import { PopupNotificationDialogComponent } from './popup/popup-notification.component';
import { SnackBarNotificationComponent } from './snack-bar/snack-bar-notification.component';

@Component({
	selector: 'app-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.scss']
})
export class NotificationComponent extends BaseComponent implements OnInit {

	constructor(
		private snackBar: MatSnackBar,
		private dialog: MatDialog,
		private uiNotificationService: UiNotificationService
	) {
		super();
	}

	ngOnInit() {
		this.uiNotificationService.getNotificationObservable().pipe(takeUntil(this._destroyed)).subscribe(notification => {
			switch (notification.type) {
				case UiNotificationType.SnackBar:
					const snackBarNotification: SnackBarNotification = notification as SnackBarNotification;
					this.snackBar.openFromComponent(SnackBarNotificationComponent, {
						data: snackBarNotification,
						duration: snackBarNotification.duration,
						panelClass: [this.getSnackBarLevelClass(snackBarNotification.level)]
					});
					break;
				case UiNotificationType.Popup:
					const popupNotification: PopupNotification = notification as PopupNotification;
					this.dialog.open(PopupNotificationDialogComponent, {
						data: popupNotification
					});
					break;
			}
		});
	}

	private getSnackBarLevelClass(level: SnackBarNotificationLevel): string {
		switch (level) {
			case SnackBarNotificationLevel.Warning: return 'snack-bar-notification--warning';
			case SnackBarNotificationLevel.Error: return 'snack-bar-notification--error';
			case SnackBarNotificationLevel.Success: return 'snack-bar-notification--success';
			default: return 'snack-bar-notification--info';
		}

	}
}
