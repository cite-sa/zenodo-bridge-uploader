import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ErrorService, HttpError } from "../errors/error.service";
import { UiNotificationService, SnackBarNotificationLevel } from "../notification/ui-notification-service";

@Injectable()
export class MessageService{
    
	constructor(
        protected errorService: ErrorService,
		protected uiNotificationService:UiNotificationService
	) {
	}

	onCallbackSuccess(message:string): void {
		this.uiNotificationService.snackBarNotification(message, SnackBarNotificationLevel.Success);
	}

	onCallbackError(errorResponse: HttpErrorResponse) {
		const error: HttpError = this.errorService.getError(errorResponse);
		this.uiNotificationService.snackBarNotification(error.getMessagesString(), SnackBarNotificationLevel.Warning);
	}
}
