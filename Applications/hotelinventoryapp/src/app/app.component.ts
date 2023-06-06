import { AfterViewInit, Component, ComponentRef, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';
import { timestamp } from 'rxjs';

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
export class AppComponent implements 
OnInit 
// AfterViewInit
{
  title = 'hotelinventoryapp';

  @ViewChild('user', {read: ViewContainerRef}) vcr!: ViewContainerRef; 
  @ViewChild('date', {static: true}) date!: ElementRef;

  // ngAfterViewInit(): void {
  //   const componentRef = this.vcr.createComponent(RoomsComponent);
  // }

  ngOnInit(): void {
    setTimeout(() => {
        // const componentRef = this.vcr.createComponent(RoomsComponent);
        // componentRef.instance.numberOfRooms += 1;
        const elementRef = this.date.nativeElement.innerText = new Date(Date.now()).toLocaleDateString();
      },0 
    )
  }

}
