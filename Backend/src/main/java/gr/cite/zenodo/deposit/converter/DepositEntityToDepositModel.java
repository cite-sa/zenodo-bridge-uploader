package gr.cite.zenodo.deposit.converter;

import gr.cite.zenodo.converter.AutoRegisteredConverter;
import gr.cite.zenodo.deposit.entity.DepositEntity;
import gr.cite.zenodo.deposit.model.DepositModel;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

@Component
public class DepositEntityToDepositModel extends AutoRegisteredConverter<DepositEntity, DepositModel> {

    private final ModelMapper modelMapper;

    @Autowired
    public DepositEntityToDepositModel(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public DepositModel convert(@NonNull DepositEntity depositEntity) {
        return modelMapper.map(depositEntity, DepositModel.class);
    }
}
