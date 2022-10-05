package gr.cite.zenodo.zenodo.security;

public enum AccessType {
	AUTHORIZATION_CODE("authorization_code", "code"),
	REFRESH_TOKEN("refresh_token", "refresh_token");

	private final String grantType;
	private final String property;

	AccessType(String grantType, String property) {
		this.grantType = grantType;
		this.property = property;
	}

	public String getGrantType() {
		return grantType;
	}

	public String getProperty() {
		return property;
	}
}