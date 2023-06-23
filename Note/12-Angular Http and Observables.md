## Angular Http and Observables
### Agenda

#### Introduction
In Angular, the HttpClient module is used to make HTTP requests to a server. When making HTTP requests with HttpClient, the response is returned as an Observable.
HttpClient is Service Provides by Angular to interact with APIs
HttpClient internally uses RxJs

An Observable is a data stream that emits values over time. In the case of an HTTP request, the Observable emits a single value when the HTTP response is received.


#### Setting Up HttpClient
- Create a proxy 
> Create a file proxy.conf.json in your project's src/ folder.
```json
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false
  }
}
```
In the CLI configuration file, angular.json, add the proxyConfig option to the serve target:
```
  "architect": {
    "serve": {
      "builder": "@angular-devkit/build-angular:dev-server",
      "options": {
        "browserTarget": "your-application-name:build",
        "proxyConfig": "src/proxy.conf.json"
      },     
```
- Import HttpClientModule in app.module.ts
`import { HttpClientModule } from '@angular/common/http';`
```
 imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
```


- Inject HttpClient Service
```typescript
export class MyService {
  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get('https://domain.com/posts');
  }
}
```
#### Using HttpClient Service
```typescript
ngOnInit(): void {
    console.log('RoomsComponent inited.')
    this.title = this.getTitle();
    this.roomService?.getRooms().subscribe(rooms => {
        this.roomList = rooms;
    }); 
    }
```