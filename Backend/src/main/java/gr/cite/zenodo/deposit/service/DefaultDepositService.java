package gr.cite.zenodo.deposit.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import gr.cite.zenodo.controller.DepositController;
import gr.cite.zenodo.deposit.entity.DepositEntity;
import gr.cite.zenodo.deposit.entity.WebDavUrlEntity;
import gr.cite.zenodo.deposit.model.DepositModel;
import gr.cite.zenodo.deposit.model.DepositRequest;
import gr.cite.zenodo.deposit.model.PostDepositRequest;
import gr.cite.zenodo.deposit.model.WebDavUrlModel;
import gr.cite.zenodo.deposit.model.metadata.Metadata;
import gr.cite.zenodo.deposit.repository.DepositRepository;
import gr.cite.zenodo.deposit.repository.WebDavUrlRepository;
import gr.cite.zenodo.exception.UploadDepositException;
import gr.cite.zenodo.storage.model.StorageFile;
import gr.cite.zenodo.zenodo.enumeration.ZenodoStatus;
import gr.cite.zenodo.zenodo.model.principal.PrincipalModel;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DefaultDepositService implements DepositService {
    private final DepositRepository depositRepository;
    private final ConversionService conversionService;
    private final WebDavUrlRepository webDavUrlRepository;
    private final static Logger logger = LoggerFactory.getLogger(DepositController.class);

    @Autowired
    public DefaultDepositService(DepositRepository depositRepository, ConversionService conversionService, WebDavUrlRepository webDavUrlRepository) {
        this.depositRepository = depositRepository;
        this.conversionService = conversionService;
        this.webDavUrlRepository = webDavUrlRepository;
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    @Override
    public DepositModel save(DepositRequest depositRequest, ZenodoStatus status, PrincipalModel principal) throws UploadDepositException {
        DepositEntity deposit = new DepositEntity();
        if (depositRequest.getDepositMetadata() == null) {
            depositRequest.setDepositMetadata(new Metadata());
        }
        if (principal != null) {
            deposit.setAccessToken(principal.getAccessToken());
            deposit.setRefreshToken(principal.getRefreshToken());
        }
        deposit.setCreatedAt(Instant.now());
        if (depositRequest.getFiles() == null) depositRequest.setFiles(Collections.emptyList());
        String files = conversionService.convert(depositRequest.getFiles(), String.class);
        deposit.setFiles(files);
        if (depositRequest.getFileUrls() == null) depositRequest.setFileUrls(Collections.emptyList());
        String fileUrls = conversionService.convert(depositRequest.getFileUrls(), String.class);
        deposit.setFileUrls(fileUrls);
        deposit.setStatus(status);
        deposit.setDoi(depositRequest.getDepositMetadata().getDoi());
        deposit.setDescription(depositRequest.getDepositMetadata().getDescription());
        deposit.setTitle(depositRequest.getDepositMetadata().getTitle());
        deposit.setReadOnlyFields(conversionService.convert(depositRequest.getReadOnlyFields(), String.class));
        deposit.setHiddenFields(conversionService.convert(depositRequest.getHiddenFields(), String.class));
        deposit.setDepositMetadata(conversionService.convert(depositRequest.getDepositMetadata(), String.class));

        DepositEntity savedDepositEntity;
        try {
            savedDepositEntity = depositRepository.save(deposit);
        } catch (Exception e) {
            throw new UploadDepositException(e.getLocalizedMessage());
        }

        try {
            saveWebDavUrls(depositRequest, savedDepositEntity);
        } catch (Exception e) {
            throw new UploadDepositException(e.getLocalizedMessage());
        }
        return conversionService.convert(savedDepositEntity, DepositModel.class);
    }

    private void saveWebDavUrls(DepositRequest depositRequest, DepositEntity savedDepositEntity) {
        List<WebDavUrlEntity> existingWebDavUrlEntities =  this.webDavUrlRepository.getByDepositionId(savedDepositEntity.getId());
        if(existingWebDavUrlEntities.size() > 0) this.webDavUrlRepository.deleteAllById(existingWebDavUrlEntities.stream().map(x -> x.getId()).collect(Collectors.toList()));

        List<WebDavUrlModel> webDavUrlModel = depositRequest.getWebDavUrlModels();
        if (webDavUrlModel == null) webDavUrlModel = Collections.emptyList();
        List<WebDavUrlEntity> webDavUrlEntity = webDavUrlModel.stream().
                map(m -> conversionService.convert(m, WebDavUrlEntity.class))
                .collect(Collectors.toList());
        final DepositEntity finalSavedDepositEntity = savedDepositEntity;
        webDavUrlEntity.forEach(e -> {
            e.setDepositEntityId(finalSavedDepositEntity.getId());
            this.webDavUrlRepository.save(e);
        });
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    @Override
    public DepositModel save(PostDepositRequest depositRequest, ZenodoStatus status) throws UploadDepositException {
        DepositEntity deposit = new DepositEntity();
        if (depositRequest.getDepositMetadata() == null) {
            depositRequest.setDepositMetadata(new Metadata());
        }
        deposit.setCreatedAt(Instant.now());
        if (depositRequest.getFiles() == null) depositRequest.setFiles(Collections.emptyList());
        String files = conversionService.convert(depositRequest.getFiles(), String.class);
        deposit.setFiles(files);
        if (depositRequest.getFileUrls() == null) depositRequest.setFileUrls(Collections.emptyList());
        String fileUrls = conversionService.convert(depositRequest.getFileUrls(), String.class);
        deposit.setFileUrls(fileUrls);
        deposit.setStatus(status);
        deposit.setDoi(depositRequest.getDepositMetadata().getDoi());
        deposit.setDescription(depositRequest.getDepositMetadata().getDescription());
        deposit.setTitle(depositRequest.getDepositMetadata().getTitle());
        deposit.setReadOnlyFields(conversionService.convert(depositRequest.getReadOnlyFields(), String.class));
        deposit.setHiddenFields(conversionService.convert(depositRequest.getHiddenFields(), String.class));
        deposit.setDepositMetadata(conversionService.convert(depositRequest.getDepositMetadata(), String.class));

        DepositEntity savedDepositEntity;
        try {
            savedDepositEntity = depositRepository.save(deposit);
        } catch (Exception e) {
            throw new UploadDepositException(e.getLocalizedMessage());
        }

        try {
            List<WebDavUrlEntity> existingWebDavUrlEntities =  this.webDavUrlRepository.getByDepositionId(savedDepositEntity.getId());
            if(existingWebDavUrlEntities.size() > 0) this.webDavUrlRepository.deleteAllById(existingWebDavUrlEntities.stream().map(x -> x.getId()).collect(Collectors.toList()));

            List<WebDavUrlModel> webDavUrlModel = depositRequest.getWebDavUrlModels();
            if (webDavUrlModel == null) webDavUrlModel = Collections.emptyList();
            List<WebDavUrlEntity> webDavUrlEntity = webDavUrlModel.stream().map(m -> conversionService.convert(m, WebDavUrlEntity.class)).collect(Collectors.toList());
            final DepositEntity finalSavedDepositEntity = savedDepositEntity;
            webDavUrlEntity.forEach(e -> {
                e.setDepositEntityId(finalSavedDepositEntity.getId());
                this.webDavUrlRepository.save(e);
            });
        } catch (Exception e) {
            throw new UploadDepositException(e.getLocalizedMessage());
        }
        return conversionService.convert(savedDepositEntity, DepositModel.class);
    }
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    @Override
    public DepositModel update(DepositRequest depositRequest, ZenodoStatus status, PrincipalModel principal,UUID id) throws UploadDepositException {
        DepositEntity deposit=depositRepository.getById(id);

        if (depositRequest.getDepositMetadata() == null) {
            depositRequest.setDepositMetadata(new Metadata());
        }
        if (depositRequest.getFiles() == null) depositRequest.setFiles(Collections.emptyList());
        String files = conversionService.convert(depositRequest.getFiles(), String.class);
        deposit.setFiles(files);
        if (depositRequest.getFileUrls() == null) depositRequest.setFileUrls(Collections.emptyList());
        String fileUrls = conversionService.convert(depositRequest.getFileUrls(), String.class);
        deposit.setFileUrls(fileUrls);
        deposit.setStatus(status);
        deposit.setAccessToken(principal.getAccessToken());
        deposit.setRefreshToken(principal.getRefreshToken());
        deposit.setDoi(depositRequest.getDepositMetadata().getDoi());
        deposit.setDescription(depositRequest.getDepositMetadata().getDescription());
        deposit.setTitle(depositRequest.getDepositMetadata().getTitle());
        deposit.setReadOnlyFields(conversionService.convert(depositRequest.getReadOnlyFields(), String.class));
        deposit.setHiddenFields(conversionService.convert(depositRequest.getHiddenFields(), String.class));
        deposit.setDepositMetadata(conversionService.convert(depositRequest.getDepositMetadata(), String.class));

        DepositEntity updatedDepositEntity;
        try {
            updatedDepositEntity = depositRepository.save(deposit);
        } catch (Exception e) {
            throw new UploadDepositException(e.getLocalizedMessage());
        }

        try {
            List<WebDavUrlEntity> existingWebDavUrlEntities =  this.webDavUrlRepository.getByDepositionId(updatedDepositEntity.getId());
            if(existingWebDavUrlEntities.size() > 0) this.webDavUrlRepository.deleteAllById(existingWebDavUrlEntities.stream().map(x -> x.getId()).collect(Collectors.toList()));

            List<WebDavUrlModel> webDavUrlModel = depositRequest.getWebDavUrlModels();
            if (webDavUrlModel == null) webDavUrlModel = Collections.emptyList();
            List<WebDavUrlEntity> webDavUrlEntity = webDavUrlModel.stream().map(m -> conversionService.convert(m, WebDavUrlEntity.class)).collect(Collectors.toList());
            final DepositEntity finalSavedDepositEntity = updatedDepositEntity;
            webDavUrlEntity.forEach(e -> {
                e.setDepositEntityId(finalSavedDepositEntity.getId());
                this.webDavUrlRepository.save(e);
            });
        } catch (Exception e) {
            throw new UploadDepositException(e.getLocalizedMessage());
        }
        return conversionService.convert(updatedDepositEntity, DepositModel.class);
    }

    @Override
    public DepositModel findMostRecentPending() {
        DepositEntity entity = depositRepository.findMostRecentPending();
        if (entity == null) return  null;
        DepositModel depositModel = conversionService.convert(entity, DepositModel.class);
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            if(entity.getReadOnlyFields() != null) depositModel.setReadOnlyFields(objectMapper.readValue(entity.getReadOnlyFields(), String[].class));
            if(entity.getHiddenFields() != null) depositModel.setHiddenFields(objectMapper.readValue(entity.getHiddenFields(), String[].class));
            if(entity.getFiles() != null) depositModel.setFiles(objectMapper.readValue(entity.getFiles(), new TypeReference<List<StorageFile>>(){}));
            if(entity.getFileUrls() != null) depositModel.setFileUrls(objectMapper.readValue(entity.getFileUrls(), new TypeReference<List<String>>(){}));
        } catch (JsonProcessingException e) {
            logger.error(e.getMessage(), e);
        }
        if (depositModel != null)
            depositModel.setDepositMetadata(conversionService.convert(entity.getDepositMetadata(), Metadata.class));
        return depositModel;
    }

    @Override
    public DepositModel getDepositRequestIsAsDraft(UUID id, ZenodoStatus status) {
        DepositEntity entity = depositRepository.getByIdWhereStatusIsAsDraft(id, status);
        DepositModel depositModel = conversionService.convert(entity, DepositModel.class);
        Objects.requireNonNull(depositModel).setDepositMetadata(conversionService.convert(entity.getDepositMetadata(), Metadata.class));
        if (entity.getReadOnlyFields() == null) entity.setReadOnlyFields("[]");
        if (entity.getHiddenFields() == null) entity.setHiddenFields("[]");
        JSONParser jsonParser = new JSONParser();
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            if(entity.getReadOnlyFields() != null) depositModel.setReadOnlyFields(objectMapper.readValue(entity.getReadOnlyFields(), String[].class));
            if(entity.getHiddenFields() != null) depositModel.setHiddenFields(objectMapper.readValue(entity.getHiddenFields(), String[].class));
            if(entity.getFiles() != null) depositModel.setFiles(objectMapper.readValue(entity.getFiles(), new TypeReference<List<StorageFile>>(){}));
            if(entity.getFileUrls() != null) depositModel.setFileUrls(objectMapper.readValue(entity.getFileUrls(), new TypeReference<List<String>>(){}));
        } catch (JsonProcessingException e) {
            logger.error(e.getMessage(), e);
        }
        return depositModel;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @Override
    public void setStatus(UUID uuid, ZenodoStatus status) {
        DepositEntity deposit = depositRepository.findById(uuid).orElseThrow();
        deposit.setStatus(status);
        depositRepository.save(deposit);
    }
}




