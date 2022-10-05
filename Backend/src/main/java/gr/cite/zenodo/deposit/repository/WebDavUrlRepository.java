package gr.cite.zenodo.deposit.repository;

import gr.cite.zenodo.deposit.entity.DepositEntity;
import gr.cite.zenodo.deposit.entity.WebDavUrlEntity;
import gr.cite.zenodo.zenodo.enumeration.ZenodoStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface WebDavUrlRepository extends JpaRepository<WebDavUrlEntity, UUID>  {
    @Query("SELECT d FROM WebDavUrlEntity d WHERE d.depositEntityId = :id")
    List<WebDavUrlEntity> getByDepositionId(@Param("id") UUID id);
}
