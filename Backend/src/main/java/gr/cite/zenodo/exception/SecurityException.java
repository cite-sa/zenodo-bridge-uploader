package gr.cite.zenodo.exception;

public class SecurityException extends RuntimeException{

    public SecurityException() {
        super("Not Authorized");
    }

    public SecurityException(String message) {
        super(message);
    }

}