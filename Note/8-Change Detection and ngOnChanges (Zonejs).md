### What is Change detection ?
Change detection is a core concept in Angular that involves monitoring changes to the data model and updating the view accordingly. When a component's data changes, Angular's change detection system detects the changes and updates the component's view.
__ngOnChanges__ is a lifecycle hook in Angular that is called when a component's input properties change. It is used to detect and respond to changes in input properties. The ngOnChanges hook receives a __SimpleChanges__ object that contains the previous and current values of the changed input properties.
When a component's input properties change, Angular's change detection system runs and triggers the ngOnChanges hook. The hook can be used to perform additional processing or update the component's view based on the changes to the input properties.
For example, suppose you have a component that displays a list of items. The component has an input property that represents the list of items to display. When the list of items changes, the ngOnChanges hook can be used to update the view with the new list of items.
__Overall__, ngOnChanges is an important tool for detecting and responding to changes in input properties, and it works hand in hand with Angular's change detection system to keep the component's view up to date with the data model.


### Why was Change Detection invented ?
__Change detection__ was invented to solve a common problem in web development: *"How to keep the view in sync with the state of the application"*
Without change detection, updating the view when the state of the application changes would require manually updating the DOM, which can be slow and error-prone. 
Change detection automates this process by detecting changes to the state of the application and updating the view accordingly.
In Angular, change detection is implemented using a number of techniques, including:
- the use of zones 
- the detection of changes to input properties and events 
- the use of change detection strategies 
These techniques allow Angular to efficiently track changes to the state of the application and update the view in a timely and efficient manner.
The invention of change detection has had a significant impact on web development, as it has made it easier to build dynamic and responsive web applications.
By automating the process of updating the view, change detection has allowed developers to focus on building the logic of their application, rather than on the mechanics of updating the user interface.

### Example
A simple component that displays a message. The message is passed to the component as an input property called message. Here's what the component code might look like:
```typescript
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-message',
  template: '<p>{{ message }}</p>'
})
export class MessageComponent implements OnChanges {
  @Input() message: string;

  ngOnChanges(changes: SimpleChanges) {
    console.log('Input properties have changed', changes);
  }
}
```
In this example, we have a component called MessageComponent that has an input property called message. The component template simply displays the value of the message input property.
The MessageComponent component also implements the OnChanges lifecycle hook, which is called whenever the component's input properties change. In the ngOnChanges hook, we log a message to the console indicating that the input properties have changed, and we log the changes using the SimpleChanges object.

In parent component:
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<app-message [message]="greeting"></app-message>'
})
export class AppComponent {
  greeting = 'Hello, world!';
}
```
The AppComponent uses the MessageComponent and passes a value of 'Hello, world!' to its __message input__ property.
When the app is run, Angular will detect that the __message input property__ of the MessageComponent component has changed and will call the ngOnChanges hook. In this case, the __SimpleChanges object__ passed to ngOnChanges will have a property called message with __the previous and current values__ of the message input property.
__ngOnChanges__ can be used to perform additional processing or update the component's view based on the changes to the input properties. For example, you could use the message input property to control the text color or font size of the message displayed by the component.

### Some best practices for using change detection in Angular?

1. Use the __OnPush change detection strategy__: The OnPush change detection strategy is a performance optimization that can improve the performance of your application by reducing the number of times change detection needs to be run. With OnPush, the change detection system will only run when the component's input properties change or when an event is triggered within the component. You can set the change detection strategy for a component by setting the changeDetection property in the @Component decorator.
Example:
In child component:
```typescript
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Rooms, Room } from '../rooms';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush  //Look at here
})

export class RoomsListComponent implements OnInit, OnChanges{
  @Input() title: string = "";
  @Input() roomList: Rooms[] = [];

  ngOnInit(): void {
    console.log('RoomsListComponent inited.')
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['title']) {
      this.title = changes['title'].currentValue;
      console.log('Room list title changed: ' + this.title)
    }
    if(changes['roomList']) {
      console.log('Room list changed');
    }
    console.log(changes)
  }
}
```
In parent component, when using __OnPush change detection strategy__, we cannot not use __[].push()__ (*it's will fail to trigger the change detection cycle*) to update the __roomList__  but we must use the spread operator to create a new array and add the new item to it, like this: `this.roomList = [...this.roomList,room];` 
or use another method that returns a new array object like __Array.concat()__.
```typescript
addRoom() {
    const room: Rooms = {
        roomNumber: 4,
        roomType: 'Deluxe Room VIP',
        amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen, Humans',
        price: 1500,
        photos:
          'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        checkinTime: new Date('12-Nov-2021'),
        checkoutTime: new Date('13-Nov-2021'),
        rating: 5,
    }

    // this.roomList.push(room);
    this.roomList = [...this.roomList,room];
    this.title = this.getTitle();
}
```
Overall, when using the OnPush change detection strategy, you need to be careful when updating the state of your component and make sure that you create new objects whenever you need to modify the state, to ensure that Angular detects the changes correctly.

2. Minimize the number of components checked during each digest cycle: To improve performance, it's important to minimize the number of components that are checked during each digest cycle. This can be achieved by __breaking down your application into smaller components__ that have well-defined responsibilities and by using the __OnPush change detection strategy__.

3. Use immutable data structures: When working with data in your application, it's a good practice to use immutable data structures. Immutable data structures are data structures that cannot be changed once they are created. By using immutable data structures, you can help reduce the number of times change detection needs to be run, as Angular can quickly determine if a data structure has changed by checking its reference.
Using immnutable.js
```typescript
import { List } from 'immutable';
const myList = List([1, 2, 3]); // creates an immutable List containing [1, 2, 3]
```
Using Immer
```typescript
import produce from 'immer';

const myObj = { foo: { bar: 42 } };

const updatedObj = produce(myObj, draft => {
  draft.foo.bar = 43;
});
```
4. __Use the trackBy function when working with lists__: When working with lists in Angular, it's important to use the trackBy function to provide a unique identifier for each item in the list. This allows Angular to quickly determine which items in the listhave changed and reduces the number of times change detection needs to be run. The trackBy function should return a unique identifier for each item in the list, such as an ID or a unique property of the item.

5. __Avoid using ngDoCheck unless absolutely necessary__: The ngDoCheck lifecycle hook is called every time change detection runs, even if there are no changes to the component's data model. This can be resource-intensive and can impact the performance of your application. It's best to avoid using ngDoCheck unless absolutely necessary.

6. __Use the ChangeDetectorRef to manually trigger change detection__: If you need to manually trigger change detection in your application, you can use the ChangeDetectorRef service. This service provides a detectChanges() method that can be called to manually trigger change detection. However, it's important to use this service sparingly, as manually triggering change detection can impact the performance of your application.
Example: 
```typescript
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponentComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    // do some work that updates the component's state
    // ...

    // manually trigger change detection for the component
    this.cdr.detectChanges();
  }
}
```
It's important to note that manually triggering change detection can have performance implications, and should be used judiciously. In general, it's best to let Angular handle change detection automatically, and only use ChangeDetectorRef to manually trigger change detection when it'sexplicitly needed, such as when working with third-party libraries that modify the DOM outside of Angular's change detection cycle.
Additionally, when using the OnPush change detection strategy, manually triggering change detection may not have the desired effect, since Angular will only run change detection for the component if its input properties or events have changed. If you need to update the state of a component that uses the OnPush change detection strategy, you should make sure that you're updating the input properties or firing events correctly to trigger the change detection cycle when needed.


