import { Injectable } from "@angular/core";
import { BaseService } from "../base.service";


@Injectable()
export class FormUtilsService extends BaseService {

    constructor() {
        super();
    }
    public getFormDataWithFiles(files: File[]): FormData {
        const formData = new FormData();
        for (var i = 0; i < files.length; i++) {
            formData.append("file", files[i]);
        }

        return formData;
    }
}