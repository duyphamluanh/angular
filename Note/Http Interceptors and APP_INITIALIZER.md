HTTP Interceptors is a special type of angular service that we can implement. It's used to apply custom logic to the central point between the client-side and server-side outgoing/incoming HTTP request and response. Keep in mind that the interceptor wants only HTTP requests.
```
                request                       request
            --------------->             --------------->
Angular App                  Interceptors                 Server 
            <---------------             <---------------
                response                      response
```
Operations of HTTP Interceptor
- Modify HTTP headers
- Modifying the request body
- Set authentication/authorization token
- Modify the HTTP response
- Error handling

Add HTTP Interceptor
```
ng generate interceptor headers
ng generate interceptor response
```

Add HTTP Interceptor to app.module.js
```typescript
providers: [
    {
      provide: APP_SERVICE_CONFIG,
      useValue: APP_CONFIG
    }, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    }
],
```

