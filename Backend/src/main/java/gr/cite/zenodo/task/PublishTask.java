package gr.cite.zenodo.task;

import gr.cite.zenodo.deposit.model.DepositModel;
import gr.cite.zenodo.deposit.service.DepositService;

import gr.cite.zenodo.zenodo.enumeration.ZenodoStatus;
import gr.cite.zenodo.zenodo.service.ZenodoUploader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Component
public class PublishTask {

    private final DepositService depositService;
    private final ZenodoUploader zenodoUploader;
    private final static Logger logger = LoggerFactory.getLogger(PublishTask.class);

    @Autowired
    public PublishTask(DepositService depositService, ZenodoUploader zenodoUploader) {
        this.depositService = depositService;
        this.zenodoUploader = zenodoUploader;

    }

    @Scheduled(fixedDelayString = "${task.fixed-delay}")
    @Transactional(isolation = Isolation.SERIALIZABLE, propagation = Propagation.REQUIRES_NEW)
    public void scheduleFixedRateTaskAsync() throws InterruptedException {
        DepositModel depositModel = depositService.findMostRecentPending();
        if (depositModel != null) {
            depositService.setStatus(depositModel.getId(), ZenodoStatus.PROCESSING);
            try {
                boolean success = this.zenodoUploader.uploadZenodoRequest(depositModel);
                if (success) {
                    depositService.setStatus(depositModel.getId(), ZenodoStatus.COMPLETED);
                } else {
                    depositService.setStatus(depositModel.getId(), ZenodoStatus.ERROR);
                }
            } catch (Exception e) {
                depositService.setStatus(depositModel.getId(), ZenodoStatus.ERROR);
                logger.error(e.getLocalizedMessage(), e);
            }

        }
    }

}












