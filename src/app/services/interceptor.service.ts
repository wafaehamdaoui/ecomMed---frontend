import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest} from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.includes('/login')) {
    const token = localStorage.getItem('token');

    if (token && token.trim() !== '') { // Ensure token is non-empty
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next(authReq);
    } else {
      console.warn('No valid token found');
    }
  }
  return next(req);
};
