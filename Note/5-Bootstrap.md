#ngx-bootstrap!
##Installation
Install the bootstrap and bootstrap-icons libraries that contain the files with Bootstrap's styles and JavaScript code.
```
npm install bootstrap bootstrap-icons
```
Configure the bootstrap and bootstrap-icons libraries. Change the angular.json file and add the bootstrap.scss, bootstrap-icons.css and bootstrap.bundle.min.js
```
"styles": [
  "node_modules/bootstrap/scss/bootstrap.scss",
  "node_modules/bootstrap-icons/font/bootstrap-icons.css",
  "src/styles.scss"
],
"scripts": [
  "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
]
```
Install the @ng-bootstrap/ng-bootstrap library which contains native Angular support:
```
npm install @ng-bootstrap/ng-bootstrap@next
```
After install, we will import the NgbModule module. Change the app.module.ts file
```
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

imports: [
  BrowserModule,
  NgbModule,
  AppRoutingModule,
],

```
