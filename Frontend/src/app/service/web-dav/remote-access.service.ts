import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';
import * as xml2js from 'xml2js';
import { FileItem, WebDavFileList } from 'src/app/model/web-dav/xml/fileItem.model';
import { map } from 'rxjs/operators';
import { WebDavUser } from 'src/app/model/web-dav/user.model';

@Injectable()
export class RemoteAccessService extends BaseService {
    private defaultXmlns = 'd:';
    private defaultXmlnsPrefix: string;
    private webDavuser: WebDavUser;
    constructor(private http: HttpClient) {
        super();
    }
    public initFolfer(webDavuser: WebDavUser): Observable<WebDavFileList> {
        this.webDavuser = webDavuser;
        return this.getProperties('/remote.php/webdav/');
    }

    public getProperties(directoryPath: string): Observable<WebDavFileList> {
        const headers: HttpHeaders = this.createHeaders(this.webDavuser.userName + ":" + this.webDavuser.password, '1')
        return this.http.request('PROPFIND', this.webDavuser.url + directoryPath, { headers: headers, responseType: 'text' })
            .pipe(map(res => {

                return this.parseXML(res, directoryPath);
            }));
    }


    private parseXML(data, directoryPath: string): WebDavFileList {

        let webDavFileList: WebDavFileList = new WebDavFileList();
        let myFileList: FileItem[] = [];
        let tmpWebDavUser = this.webDavuser;
        const parser = new xml2js.Parser({
            tagNameProcessors: [this.stripPrefix],
            attrNameProcessors: [this.stripPrefix],
            attrValueProcessors: [this.attrValueProcessor]
        }).parseString(data, function (err, value) {
            let responseArr = value.multistatus.response as any[];
            myFileList = responseArr.filter(r => r.href[0] != directoryPath).map(r => {
                let fileItem = new FileItem();

                let href = r.href[0] as string;
                fileItem.href = href;
                let herefSplit = href.split(directoryPath)[1];
                let name = herefSplit.split('/')[0];
                fileItem.name = decodeURIComponent(name);

                fileItem.isFolder = false;
                fileItem.user = tmpWebDavUser;

                if (r.propstat[0].prop[0].resourcetype[0].collection !== undefined) {
                    fileItem.isFolder = true;
                }
                return fileItem;
            });

        });
        webDavFileList.files = myFileList;
        webDavFileList.curentFolder = directoryPath;
        return webDavFileList;
    }
    private createHeaders(credentials: string, depth: string): HttpHeaders {
        return new HttpHeaders({
            'Authorization': 'Basic ' + btoa(credentials),
            'Depth': depth,
        });
    }
    private attrValueProcessor = (value: string, name: string): string => {
        if (value === this.defaultXmlns)
            this.defaultXmlnsPrefix = name.replace(/^xmlns:/, '') + ':';
        return value;
    };

    private stripPrefix = (name: string): string => {
        if (this.defaultXmlns && name.startsWith(this.defaultXmlns))
            name = name.substr(this.defaultXmlns.length);
        return name;
    };

}


