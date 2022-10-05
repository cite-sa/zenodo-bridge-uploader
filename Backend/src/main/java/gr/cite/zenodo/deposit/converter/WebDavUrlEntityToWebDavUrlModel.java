package gr.cite.zenodo.deposit.converter;

import gr.cite.zenodo.converter.AutoRegisteredConverter;
import gr.cite.zenodo.deposit.entity.WebDavUrlEntity;
import gr.cite.zenodo.deposit.model.WebDavUrlModel;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

@Component
public class WebDavUrlEntityToWebDavUrlModel extends AutoRegisteredConverter<WebDavUrlEntity, WebDavUrlModel> {
    private final ModelMapper modelMapper;

    @Autowired
    public WebDavUrlEntityToWebDavUrlModel(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public WebDavUrlModel convert(@NonNull WebDavUrlEntity webDavUrlEntity) {
        return modelMapper.map(webDavUrlEntity, WebDavUrlModel.class);
    }
}