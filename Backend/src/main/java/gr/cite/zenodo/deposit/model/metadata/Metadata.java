package gr.cite.zenodo.deposit.model.metadata;

import com.fasterxml.jackson.annotation.*;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonAutoDetect(
        fieldVisibility = JsonAutoDetect.Visibility.ANY,
        getterVisibility = JsonAutoDetect.Visibility.NONE,
        setterVisibility = JsonAutoDetect.Visibility.NONE)
@JsonIgnoreProperties(ignoreUnknown = true)
//@JsonPropertyOrder({ "upload_type", "publication_type", "image_type", "title", "Ccreator", "description",  "access_right",  "licence",  "doi",  "preserve_doi", "keywords", "notes",  "related", "identifiers",  "contributors",  "references",  "communities",  "grants",  "journal_title",  "journal_volume",  "journal_issue",  "journal_pages",  "conference_title",  "conference_acronym",  "conference_dates",  "conference_url",  "conference_session",  "conference_session_part",  "imprint_publisher", "imprint_isbn", "imprint_place", "part_title", "part_pages", "thesis_supervisors", "thesis_university", "subjects", "version", "language", "locations", "dates", "method"} )
public class Metadata  implements Serializable {


    @JsonProperty("upload_type")
    private String uploadType;
    @JsonProperty("publication_type")
    private String publicationType;
    @JsonProperty("image_type")
    private String ImageType;
    @JsonProperty("publication_date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date publicationDate;
    @JsonProperty("title")
    private String Title;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @JsonProperty("creators")
    private List<Creator> Creator;
    @JsonProperty("description")
    private String Description;
    @JsonProperty("access_right")
    private String accessRight;
    @JsonProperty("license")
    private String licence;
    @JsonProperty("access_conditions")
    private String accessCondition;
    @JsonProperty("embargo_date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date embargoDate;
    @JsonProperty("doi")
    private String Doi;
    @JsonProperty("prereserve_doi")
    private String PrereserveDoi;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @JsonProperty("keywords")
    private List<String> Keywords;
    @JsonProperty("notes")
    private String Notes;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @JsonProperty("related_identifiers")
    private List<RelatedIdentifier> RelatedIdentifiers;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @JsonProperty("contributors")
    private List<Contributors> Contributors;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @JsonProperty("references")
    private List<String> References;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @JsonProperty("communities")
    private List<Communities> Communities;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @JsonProperty("grants")
    private List<Grants> Grants;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @JsonProperty("journal_title")
    private String JournalTitle;
    @JsonProperty("journal_volume")
    private String JournalVolume;
    @JsonProperty("journal_issue")
    private String JournalIssue;
    @JsonProperty("journal_pages")
    private String JournalPages;
    @JsonProperty("conference_title")
    private String ConferenceTitle;
    @JsonProperty("conference_acronym")
    private String ConferenceAcronym;
    @JsonProperty("conference_dates")
    private String ConferenceDates;
    @JsonProperty("conference_url")
    private String ConferenceUrl;
    @JsonProperty("conference_place")
    private String ConferencePlace;
    @JsonProperty("conference_session")
    private String ConferenceSession;
    @JsonProperty("conference_session_part")
    private String ConferenceSessionPart;
    @JsonProperty("imprint_publisher")
    private String ImprintPublisher;
    @JsonProperty("imprint_isbn")
    private String ImprintIsbn;
    @JsonProperty("imprint_place")
    private String ImprintPlace;
    @JsonProperty("partof_title")
    private String PartOfTitle;
    @JsonProperty("partof_pages")
    private String PartOfPages;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @JsonProperty("thesis_supervisors")
    private List<ThesiSupervisor> ThesisSupervisors;
    @JsonProperty("thesis_university")
    private String ThesisUniversity;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @JsonProperty("subjects")
    private List<Subjects> Subjects;
    @JsonProperty("version")
    private String Version;
    @JsonProperty("language")
    private String Language;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @JsonProperty("locations")
    private List<Locations> Locations;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @JsonProperty("dates")
    private List<Dates> Dates;
    @JsonProperty("method")
    private String Method;

    public String getuploadType() {
        return uploadType;
    }

    public void setuploadType(String uploadType) {
        this.uploadType = uploadType;
    }

    public String getpublicationType() {
        return publicationType;
    }

    public void setpublicationType(String publicationType) {
        this.publicationType = publicationType;
    }

    public String getImageType() {
        return ImageType;
    }

    public void setImageType(String imageType) {
        ImageType = imageType;
    }

    public String getTitle() {
        return Title;
    }

    public void setTitle(String title) {
        Title = title;
    }

    public List<gr.cite.zenodo.deposit.model.metadata.Creator> getCreator() {
        return Creator;
    }

    public void setCreator(List<gr.cite.zenodo.deposit.model.metadata.Creator> creator) {
        Creator = creator;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }

    public String getAccessRight() {
        return accessRight;
    }

    public void setAccessRight(String accessRight) {
        accessRight = accessRight;
    }

    public String getlicence() {
        return licence;
    }

    public void setlicence(String licence) {
        licence = licence;
    }

    public String getaccessCondition() {
        return accessCondition;
    }

    public void setaccessCondition(String accessCondition) {
        accessCondition = accessCondition;
    }

    public Date getembargoDate() {
        return embargoDate;
    }

    public void setembargoDate(Date embargoDate) {
        embargoDate = embargoDate;
    }

    public String getDoi() {
        return Doi;
    }

    public void setDoi(String doi) {
        Doi = doi;
    }

    public String getPrereserveDoi() {
        return PrereserveDoi;
    }

    public void setPrereserveDoi(String prereserveDoi) {
        PrereserveDoi = prereserveDoi;
    }

    public List<String> getKeywords() {
        return Keywords;
    }

    public void setKeywords(List<String> keywords) {
        Keywords = keywords;
    }

    public String getNotes() {
        return Notes;
    }

    public void setNotes(String notes) {
        Notes = notes;
    }

    public List<RelatedIdentifier> getRelatedIdentifiers() {
        return RelatedIdentifiers;
    }

    public void setRelatedIdentifiers(List<RelatedIdentifier> relatedIdentifiers) {
        RelatedIdentifiers = relatedIdentifiers;
    }

    public List<gr.cite.zenodo.deposit.model.metadata.Contributors> getContributors() {
        return Contributors;
    }

    public void setContributors(List<gr.cite.zenodo.deposit.model.metadata.Contributors> contributors) {
        Contributors = contributors;
    }

    public List<String> getReferences() {
        return References;
    }

    public void setReferences(List<String> references) {
        References = references;
    }

    public List<gr.cite.zenodo.deposit.model.metadata.Communities> getCommunities() {
        return Communities;
    }

    public void setCommunities(List<gr.cite.zenodo.deposit.model.metadata.Communities> communities) {
        Communities = communities;
    }

    public List<gr.cite.zenodo.deposit.model.metadata.Grants> getGrants() {
        return Grants;
    }

    public void setGrants(List<gr.cite.zenodo.deposit.model.metadata.Grants> grants) {
        Grants = grants;
    }

    public String getJournalTitle() {
        return JournalTitle;
    }

    public void setJournalTitle(String journalTitle) {
        JournalTitle = journalTitle;
    }

    public String getJournalVolume() {
        return JournalVolume;
    }

    public void setJournalVolume(String journalVolume) {
        JournalVolume = journalVolume;
    }

    public String getJournalIssue() {
        return JournalIssue;
    }

    public void setJournalIssue(String journalIssue) {
        JournalIssue = journalIssue;
    }

    public String getJournalPages() {
        return JournalPages;
    }

    public void setJournalPages(String journalPages) {
        JournalPages = journalPages;
    }

    public String getConferenceTitle() {
        return ConferenceTitle;
    }

    public void setConferenceTitle(String conferenceTitle) {
        ConferenceTitle = conferenceTitle;
    }

    public String getConferenceAcronym() {
        return ConferenceAcronym;
    }

    public void setConferenceAcronym(String conferenceAcronym) {
        ConferenceAcronym = conferenceAcronym;
    }

    public String getConferenceDates() {
        return ConferenceDates;
    }

    public void setConferenceDates(String conferenceDates) {
        ConferenceDates = conferenceDates;
    }

    public String getConferenceUrl() {
        return ConferenceUrl;
    }

    public void setConferenceUrl(String conferenceUrl) {
        ConferenceUrl = conferenceUrl;
    }

    public String getConferenceSession() {
        return ConferenceSession;
    }

    public void setConferenceSession(String conferenceSession) {
        ConferenceSession = conferenceSession;
    }

    public String getConferenceSessionPart() {
        return ConferenceSessionPart;
    }

    public void setConferenceSessionPart(String conferenceSessionPart) {
        ConferenceSessionPart = conferenceSessionPart;
    }

    public String getImprintPublisher() {
        return ImprintPublisher;
    }

    public void setImprintPublisher(String imprintPublisher) {
        ImprintPublisher = imprintPublisher;
    }

    public String getImprintIsbn() {
        return ImprintIsbn;
    }

    public void setImprintIsbn(String imprintIsbn) {
        ImprintIsbn = imprintIsbn;
    }

    public String getImprintPlace() {
        return ImprintPlace;
    }

    public void setImprintPlace(String imprintPlace) {
        ImprintPlace = imprintPlace;
    }

    public String getPartOfTitle() {
        return PartOfTitle;
    }

    public void setPartOfTitle(String partOfTitle) {
        PartOfTitle = partOfTitle;
    }

    public String getPartOfPages() {
        return PartOfPages;
    }

    public void setPartOfPages(String partOfPages) {
        PartOfPages = partOfPages;
    }

    public List<ThesiSupervisor> getThesisSupervisors() {
        return ThesisSupervisors;
    }

    public void setThesisSupervisors(List<ThesiSupervisor> thesisSupervisors) {
        ThesisSupervisors = thesisSupervisors;
    }

    public String getThesisUniversity() {
        return ThesisUniversity;
    }

    public void setThesisUniversity(String thesisUniversity) {
        ThesisUniversity = thesisUniversity;
    }

    public List<gr.cite.zenodo.deposit.model.metadata.Subjects> getSubjects() {
        return Subjects;
    }

    public void setSubjects(List<gr.cite.zenodo.deposit.model.metadata.Subjects> subjects) {
        Subjects = subjects;
    }

    public String getVersion() {
        return Version;
    }

    public void setVersion(String version) {
        Version = version;
    }

    public String getLanguage() {
        return Language;
    }

    public void setLanguage(String language) {
        Language = language;
    }

    public List<gr.cite.zenodo.deposit.model.metadata.Locations> getLocations() {
        return Locations;
    }

    public void setLocations(List<gr.cite.zenodo.deposit.model.metadata.Locations> locations) {
        Locations = locations;
    }

    public List<gr.cite.zenodo.deposit.model.metadata.Dates> getDates() {
        return Dates;
    }

    public void setDates(List<gr.cite.zenodo.deposit.model.metadata.Dates> dates) {
        Dates = dates;
    }

    public String getMethod() {
        return Method;
    }

    public void setMethod(String method) {
        Method = method;
    }

    public String getConferencePlace() {
        return ConferencePlace;
    }

    public void setConferencePlace(String conferencePlace) {
        ConferencePlace = conferencePlace;
    }
}