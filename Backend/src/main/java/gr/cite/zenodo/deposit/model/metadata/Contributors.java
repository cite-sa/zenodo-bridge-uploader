package gr.cite.zenodo.deposit.model.metadata;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonAutoDetect
//@JsonPropertyOrder({"name", "type", "affiliation", "orcid", "gnd"})
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Contributors {

    @JsonProperty( "name")
    private String name;
    @JsonProperty( "type")
    private String type;
    @JsonProperty( "affiliation")
    private String affiliation;
    @JsonProperty( "orcid")
    private String orcid;
    @JsonProperty( "gnd")
    private String gnd;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getAffiliation() {
        return affiliation;
    }

    public void setAffiliation(String affiliation) {
        this.affiliation = affiliation;
    }

    public String getOrcid() {
        return orcid;
    }

    public void setOrcid(String orcid) {
        this.orcid = orcid;
    }

    public String getGnd() {
        return gnd;
    }

    public void setGnd(String gnd) {
        this.gnd = gnd;
    }

}


