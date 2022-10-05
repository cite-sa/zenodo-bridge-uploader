package gr.cite.zenodo.exception;

import gr.cite.zenodo.responses.ErrorMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestControllerExceptionHandler extends ResponseEntityExceptionHandler {
    private final Logger logger = LoggerFactory.getLogger(RestControllerExceptionHandler.class);

    @Override
    @NonNull
    protected ResponseEntity<Object> handleBindException(@NonNull BindException e, @NonNull HttpHeaders headers, @NonNull HttpStatus status, @NonNull WebRequest request) {
        return handleExceptionInternal(e, ErrorMessage.buildFromException(e), headers, HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(SecurityException.class)
    protected ResponseEntity<Object> handleSecurity(SecurityException e, WebRequest request) {
        return handleExceptionInternal(e, ErrorMessage.buildFromException (e), new HttpHeaders(), HttpStatus.UNAUTHORIZED, request);
    }

    @ExceptionHandler(RuntimeException.class)
    protected ResponseEntity<Object> handleInternalServerError(RuntimeException e, WebRequest request) {
        logger.error(e.getMessage(), e);
        return handleExceptionInternal(e, ErrorMessage.buildFromException(e), new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR, request);
    }
}
