package gr.cite.zenodo.deposit.service;

import gr.cite.zenodo.deposit.model.PostDepositRequest;
import gr.cite.zenodo.exception.UploadDepositException;
import gr.cite.zenodo.zenodo.enumeration.ZenodoStatus;
import gr.cite.zenodo.deposit.model.DepositRequest;
import gr.cite.zenodo.deposit.model.DepositModel;
import gr.cite.zenodo.zenodo.model.principal.PrincipalModel;

import java.util.UUID;


public interface DepositService {
    DepositModel save(DepositRequest depositRequest, ZenodoStatus status, PrincipalModel principal) throws UploadDepositException;

    DepositModel save(PostDepositRequest depositRequest, ZenodoStatus status) throws UploadDepositException;

    DepositModel update(DepositRequest depositRequest, ZenodoStatus status, PrincipalModel principal,UUID id) throws UploadDepositException;

    DepositModel findMostRecentPending();

    DepositModel getDepositRequestIsAsDraft(UUID id, ZenodoStatus status);

    void setStatus(UUID uuid, ZenodoStatus status);
}

