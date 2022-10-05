import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class ErrorService{
    
	constructor(
		protected language: TranslateService
	) {
	}

    getError(errorResponse:HttpErrorResponse):HttpError{
        const error: HttpError = new HttpError();
		error.statusCode = errorResponse.status;
		error.messages = this.parseMessages(error.statusCode, errorResponse);   
        return error;
    }
    
	private parseMessages(httpStatusCode: number, errorPayload: any): string[] {
		const result: string[] = [];
		switch (httpStatusCode) {
			case 400: // Bad Request, Used for validation errors.
				if (errorPayload && errorPayload.error && errorPayload.error.error_description) { result.push(errorPayload.error.error_description); }
				else if (errorPayload && errorPayload.error && errorPayload.error.error) { result.push(errorPayload.error.error); }
				else if (errorPayload && errorPayload.message) { result.push(errorPayload.message); }
				break;
			case 404: // Not Found
				if (errorPayload && errorPayload.error && errorPayload.error.error_description) { result.push(errorPayload.error.error_description); }
				else if (errorPayload && errorPayload.error && errorPayload.error.error) { result.push(errorPayload.error.error); }
				else if (errorPayload && errorPayload.message) { result.push(errorPayload.message); }
				break;
			case 500: // Bad Request, Used for validation errors.
				if (errorPayload && errorPayload.error && errorPayload.error.error_description) { result.push(errorPayload.error.error_description); }
				else if (errorPayload && errorPayload.error && errorPayload.error.error) { result.push(errorPayload.error.error); }
				else if (errorPayload && errorPayload.message) { result.push(errorPayload.message); }
				break;
			default:
				if (errorPayload && errorPayload.error && errorPayload.error.error_description) { result.push(errorPayload.error.error_description); }
				else if (errorPayload && errorPayload.error && errorPayload.error.error) { result.push(errorPayload.error.error); }
				else if (errorPayload && errorPayload.message) { result.push(errorPayload.message); }
				break;
		}

		if (result.length === 0) { result.push(this.language.instant('COMMONS.ERRORS.DEFAULT')); }

		return result;
	}
}

export class HttpError {
	statusCode: number;
	messages: string[];

	getMessagesString(): string {
		return this.messages ? this.messages.join(', ') : null;
	}
}