## Component Communication

In Angular, components can communicate with each other using various techniques, such as input and output properties, event emitters, and services.

- __Input properties__: Components can pass data to child components using input properties. Input properties are declared using the @Input decorator and can be bound tousing property binding in the parent component's template.


- __Output properties and event emitters__: Components can emit events to notify parent components about changes or user interactions using output properties and event emitters. Output properties are declared using the @Output decorator and can be bound to using event binding in the parent component's template. Event emitters are used to emit custom events with data.

- __Services__: Components can share data and functionality using services. Services are singleton objects that can be injected into components and other services. By using services, you can create reusable logic that can be shared across multiple components.

By using these techniques, you can create more modular and reusable components that can communicate with each other and share data and functionality. This can help you to create more complex and scalable applications.

Example of how to use input and output bindings in Angular:
__Parent Component__: Suppose you have a parent component called ParentComponent that has a property called parentData and a method called parentMethod
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
    <app-child [childData]="parentData" (childEvent)="parentMethod($event)"></app-child>
  `
})
export class ParentComponent {
  parentData = 'Hello from Parent';

  parentMethod(event: any) {
    console.log('Received from Child:', event);
  }
}
```
In this example, we use square brackets to bind the parentData property of the parent component to the __childData__ input property of the child component. We also use parentheses to bind the __childEvent__ output property of the child component to the parentMethod method of the parent component.

__Child Component__: Suppose you have a child component called ChildComponent that has an __input property__ called __childData__ and an __output property__ called __childEvent__
```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <div>{{ childData }}</div>
    <button (click)="sendEvent()">Send Event</button>
  `
})
export class ChildComponent {
  @Input() childData: string;
  @Output() childEvent = new EventEmitter<string>();

  sendEvent() {
    this.childEvent.emit('Hello from Child');
  }
}
```
In this example, we use the __@Input__ __*decorator*__ to define the __childData__ input property, which allows the parent component to __*pass data to the child component*__. We also use the __@Output__ __*decorator*__ to define the __childEvent__ output property, which __*allows the child component to emit events that the parent component can listen to*__.

In the __sendEvent__ method, we use the __*emit method of the childEvent property*__ to send an event with a string value of "Hello from Child".

When the parent component is initialized, the parentData property is passed to the childData input property of the child component. When the button is clicked in the child component, the sendEvent method is called, which emits an event with a string value of "Hello from Child". This event is captured by the childEvent output property of the child component, and is then passed to the parentMethod method of the parent component.

Another sample using sending objects:
__Parent Component__: Suppose you have a parent component called __ParentComponent__ that has a property called __selectedItem__ and a method called __itemSelected__:
```typescript
import { Component } from '@angular/core';
import { Item } from './item';

@Component({
  selector: 'app-parent',
  template: `
    <app-child [items]="items" (itemSelected)="itemSelected($event)"></app-child>
  `
})
export class ParentComponent {
  items: Item[] = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
  ];

  selectedItem: Item;

  itemSelected(item: Item) {
    this.selectedItem = item;
  }
}
```
In this example, we use square brackets to bind the items property of the parent component to the items input property of the child component. We also use parentheses to bind the __itemSelected__ output property of the child component to the __itemSelected__ method of the parent component.
We define a property called __selectedItem__ in the parent component to store the currently selected item.

__Child Component__: Suppose you have a child component called __ChildComponent__ that has an input property called items and an output property called __itemSelected__:
```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from './item';

@Component({
  selector: 'app-child',
  template: `
    <ul>
      <li *ngFor="let item of items" (click)="selectItem(item)">
        {{ item.name }}
      </li>
    </ul>
  `
})
export class ChildComponent {
  @Input() items: Item[];
  @Output() itemSelected = new EventEmitter<Item>();

  selectItem(item: Item) {
    this.itemSelected.emit(item);
  }
}
```
In this example, we use the __@Input decorator__ to define the items input property, which allows the parent component to pass an array of Item objects to the child component. We also use the __@Output decorator__ to define the __*itemSelected output property*__, which allows the child component to emit an event when an item is selected.
In the __selectItem__ method, we use the emit method of the itemSelected property to send an event with the selected Item object.
When an item is clicked in the child component, the __selectItem__ method is called, which emits an event with the selected Item object. This event is captured by the __*itemSelected output property*__ of the child component, and is then passed to the __itemSelected__ method of the parent component.
In the itemSelected method of the parent component, we update the value of the selectedItem property with the selected Item object.


