package gr.cite.zenodo.deposit.repository;

import gr.cite.zenodo.controller.DepositController;
import gr.cite.zenodo.deposit.entity.DepositEntity;
import gr.cite.zenodo.zenodo.enumeration.ZenodoStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@Repository
public class DepositRepositoryImpl implements CustomRepository {
    @PersistenceContext
    private EntityManager entityManager;
    private final static Logger logger = LoggerFactory.getLogger(DepositController.class);


    public DepositEntity findMostRecentPending() {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<DepositEntity> cq = cb.createQuery(DepositEntity.class);

        Root<DepositEntity> root = cq.from(DepositEntity.class);
        List<Predicate> predicates = new ArrayList<>();

        predicates.add(cb.equal(root.get("status"), ZenodoStatus.PENDING));
        cq = cq.where(predicates.toArray(new Predicate[0]));
        cq = cq.orderBy(cb.desc(root.get("createdAt")));

        TypedQuery<DepositEntity> typedQuery = entityManager.createQuery(cq).setMaxResults(1);

        try {
            return typedQuery.getSingleResult();
        } catch (NoResultException noResultException) {
            logger.warn(noResultException.getLocalizedMessage());
            return null;
        }

    }
}
