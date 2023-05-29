import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // template: `<h1>Inline template</h1>
  // <p>This is inline template</p>`,
  styleUrls: [
    './app.component.scss'
    // ,'../../node_modules/bootstrap/dist/css/bootstrap.min.css'
  ],
  // styles: [`h1 {color: red;} p {color: gray} `]
})
export class AppComponent {
  title = 'hotelinventoryapp';
}
