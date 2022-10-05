import { WebDavUser } from "../user.model";
export class FileItem {
    href: string;
    name: string;
    isFolder: boolean;
    user: WebDavUser
}
export class WebDavFileList {
    curentFolder: string;
    files: FileItem[];
}