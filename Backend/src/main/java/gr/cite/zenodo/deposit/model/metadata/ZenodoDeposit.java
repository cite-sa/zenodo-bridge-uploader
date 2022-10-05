package gr.cite.zenodo.deposit.model.metadata;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonAutoDetect
//@JsonPropertyOrder({"metadata"})
public class ZenodoDeposit {

   @JsonProperty( "metadata")
   private Metadata metadata;

   public ZenodoDeposit() {
      metadata = new Metadata();
   }
   public Metadata getMetadata() {
      return metadata;
   }

   public void setMetadata(Metadata metadata) {
      this.metadata = metadata;
   }




}
