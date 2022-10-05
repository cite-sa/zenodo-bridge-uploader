package gr.cite.zenodo.converter;

import gr.cite.zenodo.storage.configuration.EncryptionProperties;
import gr.cite.zenodo.storage.configuration.StorageProperties;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.spec.SecretKeySpec;
import javax.persistence.AttributeConverter;
import java.security.InvalidKeyException;
import java.security.Key;
import java.util.Base64;

public class EntityEncryptionAttributeConverter implements AttributeConverter<String, String> {

	private static final String AES = "AES";
	private final Key key;

	private final EncryptionProperties encryptionProperties;

	private final Cipher cipher;

	public EntityEncryptionAttributeConverter(EncryptionProperties encryptionProperties) throws Exception {
		this.encryptionProperties = encryptionProperties;
		key = new SecretKeySpec(this.encryptionProperties.getDbKey().getBytes(), AES);
		cipher = Cipher.getInstance(AES);
	}

	@Override
	public String convertToDatabaseColumn(String attribute) {
		try {
			if (attribute == null) return null;
			cipher.init(Cipher.ENCRYPT_MODE, key);
			return Base64.getEncoder().encodeToString(cipher.doFinal(attribute.getBytes()));
		} catch (InvalidKeyException | IllegalBlockSizeException | BadPaddingException e) {
			throw new IllegalArgumentException(e);
		}
	}

	@Override
	public String convertToEntityAttribute(String dbData) {
		try {
			if (dbData == null) return null;
			cipher.init(Cipher.DECRYPT_MODE, key);
			return new String(cipher.doFinal(Base64.getDecoder().decode(dbData)));
		} catch (InvalidKeyException | IllegalBlockSizeException | BadPaddingException e) {
			throw new IllegalArgumentException(e);
		}
	}
}