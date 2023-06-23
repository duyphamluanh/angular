import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const sendtokenkey = '42IkP42cU0239OLU10JzsQKRjQS65tGrDbod0l7mUbIPl5OwpLAiivaopllOc3Er'
    request = request.clone({
        setHeaders: {
            'sendtokenkey': sendtokenkey,
        }
    })
    return next.handle(request);
  }
}
