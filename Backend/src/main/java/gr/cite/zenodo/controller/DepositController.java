package gr.cite.zenodo.controller;

import gr.cite.zenodo.deposit.model.DepositModel;
import gr.cite.zenodo.deposit.model.DepositRequest;
import gr.cite.zenodo.deposit.model.ExternalDepositResponseModel;
import gr.cite.zenodo.deposit.model.PostDepositRequest;
import gr.cite.zenodo.deposit.service.WebDavUrlService;
import gr.cite.zenodo.exception.UploadDepositException;
import gr.cite.zenodo.responses.ResponseMessage;
import gr.cite.zenodo.deposit.service.DepositService;

import gr.cite.zenodo.zenodo.enumeration.ZenodoStatus;
import gr.cite.zenodo.zenodo.model.principal.PrincipalModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.UUID;

@RestController
@RequestMapping("/api/deposit")
public class DepositController {

    private final DepositService depositService;
    private final WebDavUrlService webDavUrlService;
    private final static Logger logger = LoggerFactory.getLogger(DepositController.class);
    @Value("${frontend.url}")
    private String frontEndUrl;

    @Autowired
    public DepositController(DepositService depositService, WebDavUrlService webDavUrlService) {
        this.depositService = depositService;
        this.webDavUrlService = webDavUrlService;

    }

    @PostMapping(value = "/upload", consumes = {"multipart/form-data"})
    public ResponseEntity uploadDepositRequest(@RequestParam("metadata") DepositRequest depositRequest, @RequestParam("principal") PrincipalModel principal) {
        logger.info("Saving deposit request.");
        try {
            depositService.save(depositRequest, ZenodoStatus.PENDING, principal);
        } catch (UploadDepositException e) {
            logger.error(e.getLocalizedMessage());
            throw new UnsupportedOperationException(e.getLocalizedMessage());
        }
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage<String>().status(HttpStatus.OK.value()).message("Upload deposit request"));
    }
    @PostMapping(value = "/update", consumes = {"multipart/form-data"})
    public ResponseEntity updateDepositRequest(@RequestParam("metadata") DepositRequest depositRequest, @RequestParam("principal") PrincipalModel principal,@RequestParam("id") UUID id) {
        logger.info("update deposit request.");
        try {
            depositService.update(depositRequest, ZenodoStatus.PENDING, principal,id);
        } catch (UploadDepositException e) {
            logger.error(e.getLocalizedMessage());
            throw new UnsupportedOperationException(e.getLocalizedMessage());
        }
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage<String>().status(HttpStatus.OK.value()).message("Update deposit request"));
    }

    @PostMapping(value = "/upload/external")
    public ResponseEntity uploadExternalDepositData(@RequestBody PostDepositRequest depositRequest, HttpServletResponse response) {

        logger.info("Saving deposit request.");
        DepositModel depositModel;
        try {
            depositModel = depositService.save(depositRequest, ZenodoStatus.SAVE_AS_DRAFT);
        } catch (UploadDepositException e) {
            logger.error(e.getLocalizedMessage());
            throw new UnsupportedOperationException(e.getLocalizedMessage());
        }
        String returnUrl = frontEndUrl + "/" + depositModel.getId();

        return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage<ExternalDepositResponseModel>()
                .body(new ExternalDepositResponseModel(depositModel.getId(), true, returnUrl)).status(HttpStatus.OK.value()).message("Get deposit request"));
    }

    @RequestMapping(method = RequestMethod.GET, value = {"/{id}"})
    public ResponseEntity getDepositRequest(@PathVariable(name = "id") UUID id) {

        logger.info("get deposit request.");
        DepositModel depositModel = depositService.getDepositRequestIsAsDraft(id, ZenodoStatus.SAVE_AS_DRAFT);

        return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage<DepositModel>()
                .body(depositModel).status(HttpStatus.OK.value()).message("Get deposit request"));

    }
}



