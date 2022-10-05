package gr.cite.zenodo.deposit.converter;

import gr.cite.zenodo.converter.AutoRegisteredConverter;
import gr.cite.zenodo.deposit.entity.DepositEntity;
import gr.cite.zenodo.deposit.model.DepositModel;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DepositModelToDepositEntity extends AutoRegisteredConverter<DepositModel, DepositEntity> {

    private final ModelMapper modelMapper;

    @Autowired
    public DepositModelToDepositEntity(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public DepositEntity convert(DepositModel depositModel) {
        return modelMapper.map(depositModel, DepositEntity.class);
    }
}
