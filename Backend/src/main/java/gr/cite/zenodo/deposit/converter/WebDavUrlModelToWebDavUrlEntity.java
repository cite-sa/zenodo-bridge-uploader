package gr.cite.zenodo.deposit.converter;

import gr.cite.zenodo.converter.AutoRegisteredConverter;
import gr.cite.zenodo.deposit.entity.WebDavUrlEntity;
import gr.cite.zenodo.deposit.model.WebDavUrlModel;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

@Component
public class WebDavUrlModelToWebDavUrlEntity extends AutoRegisteredConverter<WebDavUrlModel, WebDavUrlEntity> {
    private final ModelMapper modelMapper;

    @Autowired
    public WebDavUrlModelToWebDavUrlEntity(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public WebDavUrlEntity convert(@NonNull WebDavUrlModel webDavUrlModel) {
        return modelMapper.map(webDavUrlModel, WebDavUrlEntity.class);
    }
}