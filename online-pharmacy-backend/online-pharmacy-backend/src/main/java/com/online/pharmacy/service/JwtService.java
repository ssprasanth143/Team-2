package com.online.pharmacy.service;

import java.security.Key;
import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
  @Value("${app.jwt.secret:change_this_default_secret_change_this_default_secret}")
  private String secret;

  @Value("${app.jwt.expirationMs:86400000}")
  private long expirationMs;

  private Key key(){ return Keys.hmacShaKeyFor(secret.getBytes()); }

  public String generate(String subject, Map<String, Object> claims){
    return Jwts.builder()
        .setSubject(subject)
        .addClaims(claims)
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis()+expirationMs))
        .signWith(key(), SignatureAlgorithm.HS256)
        .compact();
  }

  public Jws<Claims> parse(String token){
    return Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(token);
  }
}
