package gr.cite.zenodo.responses;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseMessage<T> {
    private Integer status;
    private String message;
    private T body;

    public Integer getStatus() {
        return status;
    }

    public ResponseMessage<T> status(Integer status) {
        this.status = status;
        return this;
    }

    public String getMessage() {
        return message;
    }

    public ResponseMessage<T> message(String message) {
        this.message = message;
        return this;
    }

    public T getBody() {
        return body;
    }

    public ResponseMessage<T> body(T body) {
        this.body = body;
        return this;
    }

}
