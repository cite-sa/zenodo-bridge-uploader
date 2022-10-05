package gr.cite.zenodo.deposit.service;

import gr.cite.zenodo.controller.DepositController;
import gr.cite.zenodo.deposit.entity.WebDavUrlEntity;
import gr.cite.zenodo.deposit.model.WebDavUrlModel;
import gr.cite.zenodo.deposit.repository.WebDavUrlRepository;
import gr.cite.zenodo.exception.UploadWebdavUrlException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.stereotype.Service;

@Service
public class DefaultWebDavUrlService implements WebDavUrlService {
    private final WebDavUrlRepository webDavUrlRepository;
    private final ConversionService conversionService;
    private final static Logger logger = LoggerFactory.getLogger(DepositController.class);

    @Autowired
    public DefaultWebDavUrlService(WebDavUrlRepository webDavUrlRepository, ConversionService conversionService) {
        this.webDavUrlRepository = webDavUrlRepository;

        this.conversionService = conversionService;
    }

    @Override
    public void save(WebDavUrlModel webDavUrlModel) throws UploadWebdavUrlException {

        WebDavUrlEntity webDavUrlEntity = conversionService.convert(webDavUrlModel, WebDavUrlEntity.class);
        try {
            this.webDavUrlRepository.save(webDavUrlEntity);
        } catch (Exception e) {
            throw new UploadWebdavUrlException(e.getLocalizedMessage());
        }
    }
}
