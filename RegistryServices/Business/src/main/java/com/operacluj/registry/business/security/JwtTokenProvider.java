package com.operacluj.registry.business.security;

import com.operacluj.registry.model.User;
import io.jsonwebtoken.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtTokenProvider {

    private static final Logger LOG = LogManager.getLogger(JwtTokenProvider.class);

    public String generateToken(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        String userId = Integer.toString(user.getUserId());

        Date now = new Date(System.currentTimeMillis());
        Date expiryDate = new Date(now.getTime() + SecurityConstants.EXPIRATION_TIME);

        Map<String, Object> claims = new HashMap<>();
        claims.put("id", userId);
        claims.put("email", user.getEmail());
        claims.put("firstName", user.getFirstName());
        claims.put("lastName", user.getLastName());

        return Jwts.builder()
                .setSubject(userId)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, SecurityConstants.SECRET)
                .compact();

    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SecurityConstants.SECRET).parseClaimsJws(token);
            return true;
        } catch (SignatureException e) {
            LOG.error("Invalid JWT Signature");
        } catch (MalformedJwtException e) {
            LOG.error("Invalid JWT token");
        } catch (ExpiredJwtException e) {
            LOG.error("Expired JWT token");
        } catch (UnsupportedJwtException e) {
            LOG.error("Unsupported JWT token");
        } catch (IllegalArgumentException e) {
            LOG.error("JWT claims string is empty");
        }
        return false;
    }

    public int getUserIdFromJWT(String token) {
        Claims claims = Jwts.parser().setSigningKey(SecurityConstants.SECRET).parseClaimsJws(token).getBody();
        return Integer.parseInt(String.valueOf(claims.get("id")));
    }
}
