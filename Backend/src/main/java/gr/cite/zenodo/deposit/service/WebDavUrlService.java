package gr.cite.zenodo.deposit.service;

import gr.cite.zenodo.deposit.model.WebDavUrlModel;
import gr.cite.zenodo.exception.UploadWebdavUrlException;

public interface WebDavUrlService {
    void save(WebDavUrlModel webDavUrlModel) throws UploadWebdavUrlException;

}
