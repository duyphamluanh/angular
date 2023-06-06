## ViewChild
ViewChild is a decorator that allows a component to access a child component, directive, or element in its template.
```typescript
import { Component, ViewChild } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-parent',
  template: `<app-child></app-child>`
})
export class ParentComponent {
  @ViewChild(ChildComponent) childComponent: ChildComponent;

  ngAfterViewInit() {
    // Access the child component's public methods or properties
    this.childComponent.doSomething();
  }
}
```
In this example, we have a parent component that contains a child component <app-child>. The @ViewChild decorator is used to access the ChildComponent instance in the parent component.
The __ngAfterViewInit()__ lifecycle hook is used to ensure that the view has been initialized and the child component is available. In this hook, we can access the child component's public methods or properties and perform any necessary operations.

*Note that __@ViewChild__ is only available in the parent component after the child component has been rendered. If we need to access a child component that is created dynamically or conditionally, we may need to use __ngAfterContentInit()__ instead of __ngAfterViewInit()__, or we may need to use a different approach, such as __@ContentChild__, to access the child component.*

*__ViewChild__ can also be used to access __DOM elements__ or directives in a component's template. To access a DOM element with a specific ID, we can use the following code:
```typescript
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `<div #myDiv id="myDiv">Hello World</div>`
})
export class ParentComponent {
  @ViewChild('myDiv') myDiv: ElementRef;

  ngAfterViewInit() {
    // Access the DOM element's properties
    console.log(this.myDiv.nativeElement.textContent);
  }
}
```
In this example, we used the #myDiv template reference variable to reference the <div> element with the id attribute set to "myDiv". We then used the __@ViewChild('myDiv')__ decorator to access the ElementRef instance of the <div> element.
With __ElementRef__, we can access the underlying native element using the nativeElement property, and then access its properties or methods as needed.

#### ExpressionChangedAfterItHasBeenCheckedError when update childcomponent after view inited
https://angular.io/errors/NG0100  
__ExpressionChangedAfterItHasBeenCheckedError__ is an error that occurs in Angular when a property value changes after the change detection cycle has completed. This error occurs when a component or directive updates a data-bound property value in its lifecycle hooks or event handlers, after the change detection cycle has already run.
The reason for this error is that __Angular runs two change detection cycles for each component__: one to __detect changes in the component's input properties__, and another to __detect changes in the component's template__. During the second cycle, Angular checks to ensure that no data-bound property has changed after the first cycle. If a property has changed, Angular throws the ExpressionChangedAfterItHasBeenCheckedError error.
If you try to update a __ViewChild__ property in the __ngAfterViewInit__ hook, you may encounter the __ExpressionChangedAfterItHasBeenCheckedError__ error. This error occurs when a change is made to a property value after the change detection cycle has completed, which is the case when ngAfterViewInit is called.

To avoid this error, you can use the setTimeout function with a delay of 0 to defer the property update to the next tick of the JavaScript event loop. This will ensure that the update happens after the change detection cycle is complete.
```typescript
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-parent',
  template: `
    <app-child></app-child>
  `
})
export class ParentComponent implements AfterViewInit {
  @ViewChild(ChildComponent) childComponent: ChildComponent;

  ngAfterViewInit() {
    setTimeout(() => {
      this.childComponent.title = 'New Title';
    }, 0);
  }
}
```
In this example, the ParentComponent has a ViewChild decorator to get a reference to ChildComponent. In the ngAfterViewInit lifecycle hook, we use the setTimeout function to defer the update of the title property to the next tick of the event loop. This ensures that the update happens after the change detection cycle is complete, and prevents the __ExpressionChangedAfterItHasBeenCheckedError__ error.
Note that using setTimeout with a delay of 0 is a common pattern in Angular for deferring updates to the next tick of the event loop. However, it should be used with caution as it __can lead to performance issues if used excessively__.

Setting the "static" parameter to __true__ indicates that it is safe to use the "onInit" function of its parent component. 
Explain how it works:
- When static is set to false (the default value), the __@ViewChild__ query is not resolved until the parent component's __ngAfterViewInit()__ lifecycle hook is called. This means that the child component or element may not be available in the parent component's __OnInit()__ hook.
- On the other hand, when static is set to true, the __@ViewChild__ query is resolved immediately and the result is available in the parent component's __OnInit()__ hook. This can be useful in some cases where you need to access the child component or element as early as possible in the parent component's lifecycle.
However, setting static to true can also cause issues if t__*he child component or element is not available at the time the query is executed*__. This can happen if the child component is generated dynamically or if it's part of a conditional block that may not be rendered at all.  

Performance:  
- When static is set to false, the @ViewChild query is not resolved until the parent component's ngAfterViewInit() lifecycle hook is called. This means that there is some additional overhead in resolving the query at runtime, which can potentially impact performance.
- On the other hand, when static is set to true, the @ViewChild query is resolved immediately and the result is available in the parent component's OnInit() hook. This can result in faster initialization times and potentially better performance overall.
However, it's important to note that the performance impact of setting static to false is usually negligible, and in most cases, it's not worth sacrificing the safety and robustness that comes with waiting for the child component to be initialized.
In general, it's a good practice to set static to false unless you have a specific use case that requires early access to the child component and you are __confident__ that it will be available at the time the query is executed.
Case when it could be available:
- the child component does not contain any synchronous code
- Accessing a child component that is defined in the parent component's template: If the child component is part of the parent component's template and is always rendered when the parent component is initialized, it's safe to set static to true
```html
<app-parent>
  <app-child #child></app-child>
</app-parent>
```
In this case, the app-child component is always defined in the parent component's template and will be available when the parent component is initialized. Therefore, it's safe to set static to true when using @ViewChild('child', { static: true }).

## ViewChildren
ViewChildren is an Angular directive that is used to obtain a reference to a child component, directive, or element in a parent component's template.
When you apply the ViewChildren decorator to a property in a parent component, Angular will query the DOM to find all elements or components that match the specified selector. The result is a QueryList of elements or components that you can use to interact with or manipulate the child components.

Here is an example usage of ViewChildren:
```typescript
import { Component, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'parent-component',
  template: `
    <child-component></child-component>
    <child-component></child-component>
  `
})
export class ParentComponent {
  @ViewChildren(ChildComponent) children: QueryList<ChildComponent>;

  ngAfterViewInit() {
    // Access the child components using the QueryList
    this.children.forEach(child => {
      console.log(child);
    });
  }
}

@Component({
  selector: 'child-component',
  template: '<div>Child Component</div>'
})
export class ChildComponent {
  // Child component definition
}
```
In this example, ParentComponent queries all instances of ChildComponent using ViewChildren. The ngAfterViewInit() lifecycle hook is then used to access all the child components via the QueryList.
