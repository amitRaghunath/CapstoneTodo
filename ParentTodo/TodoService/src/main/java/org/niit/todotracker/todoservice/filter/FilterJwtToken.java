package org.niit.todotracker.todoservice.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class FilterJwtToken extends GenericFilterBean {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        HttpServletResponse httpServletResponse = (HttpServletResponse) servletResponse;
        ServletOutputStream sos = httpServletResponse.getOutputStream();
        String authHeader = httpServletRequest.getHeader("Authorization");
        if(authHeader == null || !authHeader.startsWith("Bearer")){
            httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            sos.print("Invalid Or Missing Token");
            sos.close();
        }else{
            String token = authHeader.substring(7);
            Claims claims = Jwts.parser().setSigningKey("userKey").parseClaimsJws(token).getBody();
            httpServletRequest.setAttribute("emailid",claims.get("email"));
            httpServletRequest.setAttribute("claims", claims);
            filterChain.doFilter(servletRequest, servletResponse);
        }
    }
}
