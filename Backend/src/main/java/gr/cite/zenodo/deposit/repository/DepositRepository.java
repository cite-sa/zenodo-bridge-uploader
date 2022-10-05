package gr.cite.zenodo.deposit.repository;

import gr.cite.zenodo.deposit.entity.DepositEntity;
import gr.cite.zenodo.zenodo.enumeration.ZenodoStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface DepositRepository extends JpaRepository<DepositEntity, UUID>, CustomRepository {
    @Query("SELECT d FROM DepositEntity d WHERE d.status = :status and d.id = :id")
    DepositEntity getByIdWhereStatusIsAsDraft(@Param("id") UUID id, @Param("status") ZenodoStatus status);
}
