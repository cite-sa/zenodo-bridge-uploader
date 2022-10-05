package gr.cite.zenodo.deposit.model.metadata;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonAutoDetect
@JsonIgnoreProperties(ignoreUnknown=true)
//@JsonPropertyOrder({ "name", "affiliation", "orcid", "gnd"})
public class Creator {
    @JsonProperty( "name")
    private String name;
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
