package io.datains.auth.util;

public class UserKey extends BasePrefix {

	private UserKey(String prefix) {
		super(prefix);
	}
	public static UserKey getById = new UserKey("");
	public static UserKey getByName = new UserKey("token:");
}
