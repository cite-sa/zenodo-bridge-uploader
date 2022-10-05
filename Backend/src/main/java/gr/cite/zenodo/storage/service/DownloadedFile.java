package gr.cite.zenodo.storage.service;

import java.io.File;

public class DownloadedFile {
    public String filename;
    public File file;

    public DownloadedFile(String filename, File file) {
        this.filename = filename;
        this.file = file;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public File getFile() {
        return file;
    }

    public void setFile(File file) {
        this.file = file;
    }
}
