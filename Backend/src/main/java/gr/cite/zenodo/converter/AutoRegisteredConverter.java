package gr.cite.zenodo.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.core.convert.converter.Converter;
import org.springframework.core.convert.support.GenericConversionService;

import javax.annotation.PostConstruct;

public abstract class AutoRegisteredConverter<S, T> implements Converter<S, T> {
    private ConversionService conversionService;

    public ConversionService getConversionService() {
        return conversionService;
    }

    @Autowired
    public void setConversionService(ConversionService conversionService) {
        this.conversionService = conversionService;
    }

    @PostConstruct
    private void register() {
        if (conversionService instanceof GenericConversionService) {
            ((GenericConversionService) conversionService).addConverter(this);
        }
    }
}
