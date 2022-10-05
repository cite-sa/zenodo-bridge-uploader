package gr.cite.zenodo.zenodo.service;

import gr.cite.zenodo.deposit.model.DepositModel;

public interface ZenodoUploader {
    boolean uploadZenodoRequest(DepositModel depositModel);
}
