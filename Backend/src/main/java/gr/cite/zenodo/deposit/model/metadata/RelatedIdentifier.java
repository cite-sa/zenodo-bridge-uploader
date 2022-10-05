package gr.cite.zenodo.deposit.model.metadata;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonAutoDetect
//@JsonPropertyOrder({"identifier", "relation", "resource_type"})
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class RelatedIdentifier {
    @JsonProperty( "identifier")
    private String identifier;
    @JsonProperty( "relation")
    private String relation;
    @JsonProperty( "resource_type")
    private String resource_type;

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String getRelation() {
        return relation;
    }

    public void setRelation(String relation) {
        this.relation = relation;
    }

    public String getResource_type() {
        return resource_type;
    }

    public void setResource_type(String resoourse_type) {
        this.resource_type = resoourse_type;
    }
}
