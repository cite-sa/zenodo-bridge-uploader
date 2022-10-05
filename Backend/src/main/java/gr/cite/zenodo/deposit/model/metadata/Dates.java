package gr.cite.zenodo.deposit.model.metadata;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

@JsonAutoDetect
//@JsonPropertyOrder({ "start", "end", "type", "description"})
@JsonIgnoreProperties(ignoreUnknown = true)
public class Dates {
    @JsonProperty( "start")
    private Date start;
    @JsonProperty( "end")
    private  Date end;
    @JsonProperty( "type")
    private String type;
    @JsonProperty( "description")
    private String description;

    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public Date getEnd() {
        return end;
    }

    public void setEnd(Date end) {
        this.end = end;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
