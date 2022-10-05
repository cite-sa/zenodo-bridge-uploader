package gr.cite.zenodo.deposit.repository;

import gr.cite.zenodo.deposit.entity.DepositEntity;

public interface CustomRepository {
    DepositEntity findMostRecentPending() ;
}








