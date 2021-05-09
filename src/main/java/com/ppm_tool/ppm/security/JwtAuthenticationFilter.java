package com.ppm_tool.ppm.security;

import java.io.IOException;
import java.util.Collections;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ppm_tool.ppm.domain.User;
import com.ppm_tool.ppm.payload.JWTProvider;
import com.ppm_tool.ppm.services.CustomUserDetailsService;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
	
	@Autowired
	private JWTProvider jwtProvider;
	
	@Autowired
	private CustomUserDetailsService customUserDetailsService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		try {
			String jwt = this.getJWTFromRequest(request);
			Long userId = jwtProvider.getUserIdFromJwt(jwt);
			User userDetails = customUserDetailsService.loadUserById(userId);
			
			UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
						userDetails, null, Collections.emptyList()
			);
			
			authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
			
			SecurityContextHolder.getContext().setAuthentication(authentication);
			
			
			
			if(StringUtils.hasText(jwt) && jwtProvider.validateToken(jwt)) {
				
			}
			
		}catch(Exception ex) {
			logger.error("Could not set user authentication in security context", ex);
		}
		
		filterChain.doFilter(request, response);
		
	}
	
	private String getJWTFromRequest(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");
		
		if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7, bearerToken.length());
		}
		
		return null;
		
	}

}
