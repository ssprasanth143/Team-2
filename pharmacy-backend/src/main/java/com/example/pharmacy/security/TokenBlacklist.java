package com.example.pharmacy.security;

import org.springframework.stereotype.Component;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class TokenBlacklist {
    private Set<String> blacklisted = ConcurrentHashMap.newKeySet();

    public void blacklist(String token) {
        if (token != null) blacklisted.add(token);
    }

    public boolean isBlacklisted(String token) {
        return token != null && blacklisted.contains(token);
    }
}
