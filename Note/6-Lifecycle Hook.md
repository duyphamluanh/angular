## Lifecycle Hooks

Angular provides a set of lifecycle hooks that allow you to tap into different stages of a component's lifecycle. These hooks provide a way to perform actions before, after, or during certain stages of a component's lifecycle, such as when it is created, updated, or destroyed.

Some of the most commonly used lifecycle hooks in Angular include:
- __ngOnInit__: This hook is called after the component has been initialized and its inputs have been bound for the first time. This is a good place to perform any initialization logic that requires data from inputs or services.
- __ngOnChanges__: This hook is called whenever one or more of the component's input properties change. This is a good place to perform any logic that depends on input changes.
- __ngOnDestroy__: This hook is called just before the component is destroyed. This is a good place to perform any cleanup logic, such as unsubscribing from observables or clearing timers.

By using lifecycle hooks, you can perform various actions at different stages of a component's lifecycle, which can help you to create more robust and efficient components.

# Angular lifecycle hooks practical example
1. __ngOnChanges__: This hook is called whenever one or more of the component's input properties change. Here's an example:
```typescript
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-my-component',
  template: `
    <div>
      Name: {{ name }}
    </div>
  `
})
export class MyComponent implements OnChanges {
  @Input() name: string;

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }
}
// The OnChanges interface is implemented to handle changes to the name input property. The ngOnChanges method is called whenever the value of the name property changes. It logs the changes to the console for debugging purposes.
```

2. __ngOnInit__: This hook is called after the component has been initialized and its inputs have been bound for the first time. Here's an example:
```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-component',
  template: `
    <div>
      Name: {{ name }}
    </div>
  `
})
export class MyComponentimplements OnInit {
  name: string;

  ngOnInit() {
    this.name = 'John';
  }
}
// The ngOnInit method is called after the component has been initialized. In this example, we set the value of the name property to 'John' in the ngOnInit method.
```

3. __ngDoCheck__: This hook is called during every change detection cycle. Here's an example:
```typescript
import { Component, Input, DoCheck } from '@angular/core';

@Component({
  selector: 'app-my-component',
  template: `
    <div>
      Name: {{ name }}
    </div>
  `
})
export class MyComponent implements DoCheck {
  @Input() name: string;

  ngDoCheck() {
    console.log('Change detected');
  }
}
// The DoCheck interface is implemented to handle change detection. The ngDoCheck method is called during every change detection cycle. It logs a message to the console indicating that a change has been detected
```

4. __ngAfterContentInit__: This hook is called after the component's content __has been projected into its view__. Here's an example:
```typescript
import { Component, AfterContentInit, ContentChildren, QueryList } from '@angular/core';
import { MyChildComponent } from './my-child.component';

@Component({
  selector: 'app-my-component',
  template: `
    <div>
      <ng-content></ng-content>
    </div>
  `
})
export class MyComponent implements AfterContentInit {
  @ContentChildren(MyChildComponent) children: QueryList<MyChildComponent>;

  ngAfterContentInit() {
    console.log(this.children);
  }
}
// The AfterContentInit interface is implemented to handle changes to the content projection. The ngAfterContentInit method is called after the component's content has been projected into its view. It logs the children of the MyChildComponent type using @ContentChildren.
```
5. __ngAfterViewInit__: This hook is called after the component's view has been initialized. Here's an example:
```typescript
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MyChildComponent } from './my-child.component';

@Component({
  selector: 'app-my-component',
  template: `
    <div>
      <app-my-child></app-my-child>
    </div>
  `
})
export class MyComponent implements AfterViewInit {
  @ViewChild(MyChildComponent) child: MyChildComponent;

  ngAfterViewInit() {
    console.log(this.child);
  }
}
// The AfterViewInit interface is implemented to handle changes to the view. The ngAfterViewInit method is called after the component's view has been initialized. It logs the MyChildComponent instance using @ViewChild.
```

6. __ngOnDestroy__: This hook is called just before the component is destroyed. Here's an example:
```typescript
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-component',
  template: '<div>My Component</div>'
})
export class MyComponent implements OnDestroy {
  private subscription: Subscription;

  constructor() {
    this.subscription = someObservable.subscribe(...);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
// In Angular, the ngOnDestroy lifecycle hook is called just before a component is destroyed and removed from the DOM. It provides an opportunity to perform any cleanup or finalization that is needed before the component is destroyed, such as unsubscribing from observables, clearing timers, or releasing resources.
```

# Note
##### Angular, if a parent component passes data to a child component through an input binding, the ngOnChanges lifecycle hook of the child component will be called before the ngOnInit lifecycle hook.

##### Difference between ngDoCheck and ngOnChanges:
The `ngDoCheck` and `ngOnChanges` lifecycle hooks in Angular are both used to detect changes in a component and take appropriate action. However, they serve different purposes and have different use cases.
The `ngOnChanges` hook is called whenever one or more input properties of a component have changed. It receives an object that contains the current and previous values of the input properties, and can be used to take action based on the changes. For example, a component might use this hook to update its state or perform some other action when its input properties change.

On the other hand, the `ngDoCheck` hook is called during every change detection cycle, regardless of whether any input properties have changed. It can be used to detect changes in the component or its child components that may not be detected by the default change detection mechanism. For example, a component might use this hook to manually check the state of a third-party library or to perform some other custom change detection logic.

In general, it's recommended to use the `ngOnChanges` hook to handle changes to input properties, and to use the `ngDoCheck` hook sparingly and only when necessary, as it can be a performance-intensive operation.

##### Change Detection and ngOnChanges

