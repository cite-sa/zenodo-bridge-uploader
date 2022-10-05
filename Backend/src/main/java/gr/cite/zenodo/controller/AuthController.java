package gr.cite.zenodo.controller;


import gr.cite.zenodo.zenodo.model.ZenodoRequestToken;
import gr.cite.zenodo.zenodo.model.principal.PrincipalModel;
import gr.cite.zenodo.responses.ResponseMessage;
import gr.cite.zenodo.zenodo.security.ZenodoTokenValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "api/auth")
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final ZenodoTokenValidator tokenValidator;

    @Autowired
    public AuthController(ZenodoTokenValidator tokenValidator) {
        this.tokenValidator = tokenValidator;
    }

    @RequestMapping(method = RequestMethod.POST, value = {"/zenodoRequestToken"}, produces = "application/json", consumes = "application/json")
    public @ResponseBody
    ResponseEntity<ResponseMessage<PrincipalModel>> ZenodoRequestToken(@RequestBody ZenodoRequestToken zenodoRequestToken) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage<PrincipalModel>()
                .status(HttpStatus.OK.value()).body(tokenValidator.getAccessToken(zenodoRequestToken)));
    }
}
