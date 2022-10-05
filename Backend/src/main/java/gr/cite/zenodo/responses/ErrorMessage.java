package gr.cite.zenodo.responses;

import gr.cite.zenodo.exception.SecurityException;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;

import java.util.HashSet;
import java.util.Set;

public class ErrorMessage {

    private Set<ErrorResponseField> errors = new HashSet<>();

    public Set<ErrorResponseField> getErrors() {
        return errors;

    }

    public void setErrors(Set<ErrorResponseField> errors) {
        this.errors = errors;
    }

    public static ErrorMessage buildFromException(RuntimeException e) {
        ErrorMessage errorMessage = new ErrorMessage();
        Set<ErrorResponseField> errors = new HashSet<>();
        errors.add(new ErrorResponseField(Type.EXCEPTION, e.getClass().getSimpleName(), e.getMessage()));
        errorMessage.setErrors(errors);
        return errorMessage;
    }

    public static ErrorMessage buildFromException(SecurityException e) {
        ErrorMessage errorMessage = new ErrorMessage();
        Set<ErrorResponseField> errors = new HashSet<>();
        errors.add(new ErrorResponseField(Type.SECURITY, e.getClass().getSimpleName(), e.getMessage()));
        errorMessage.setErrors(errors);
        return errorMessage;
    }

    public static ErrorMessage buildFromException(BindException e) {
        ErrorMessage errorMessage = new ErrorMessage();
        Set<ErrorResponseField> errors = new HashSet<>();
        for (FieldError error : e.getFieldErrors()) {
            errors.add(new ErrorResponseField(Type.CONSTRAINT_VIOLATION, error.getField(), error.getDefaultMessage()));
        }
        errorMessage.setErrors(errors);
        return errorMessage;
    }

    public static class ErrorResponseField {
        private String type, name, message;

        public ErrorResponseField(String type, String name, String message) {
            this.type = type;
            this.name = name;
            this.message = message;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

    public static class Type {

        public static final String EXCEPTION = "EXCEPTION";
        public static final String SECURITY = "SECURITY";
        public static final String RESOURCE_NOT_FOUND = "RESOURCE_NOT_FOUND";
        public static final String CONSTRAINT_VIOLATION = "CONSTRAINT_VIOLATION";
    }
}
