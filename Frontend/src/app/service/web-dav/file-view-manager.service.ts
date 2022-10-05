import { Injectable } from "@angular/core";
import { BaseService } from "../base.service";

@Injectable()
export class FileViewManagerService extends BaseService {
    private _depth: number;
    private trackingFolders: Map<number, string> = new Map();
    constructor() {
        super();
    }

    public initTree(path: string): void {
        this._depth = 0;
        this.trackingFolders.set(this._depth, path);
    }
    public findNext(path: string): void {
        this._depth++;
        this.trackingFolders.set(this._depth, path);
    }
    public findPrevious(path: string): void {
        this.trackingFolders.delete(this._depth);
        this._depth--;
    }

    public getParentFolder(): string {
        return this.trackingFolders.get(this._depth - 1);
    }
    get depth() { return this._depth }
}
