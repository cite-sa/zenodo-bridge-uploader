import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ErrorService, HttpError } from 'src/app/service/errors/error.service';
import { SnackBarNotificationLevel, UiNotificationService } from 'src/app/service/notification/ui-notification-service';
@Component({
	template: ''
  })
export abstract class BaseComponent implements OnDestroy {

	protected _destroyed: Subject<boolean> = new Subject();

	protected constructor() { }

	ngOnDestroy(): void {
		this._destroyed.next(true);
		this._destroyed.complete();
	}
}
