## Introduction
Dependency Injection is a __design pattern__ commonly used in software engineering to manage the dependencies between different components of an application.
- The basic idea behind dependency injection is to separate the creation and management of objects from their use. 
- Instead of hard-coding dependencies within a class or module, dependency injection allows those dependencies to be supplied by an external source.
- In practice, this means that a class or module is designed to __receive the dependencies__ it needs as parameters __in its constructor or through setter methods__. The dependencies themselves are typically supplied by a container or framework that manages the creation and configuration of objects in the application.
- The benefits of dependency injection include increased flexibility, modularity, and testability. By __decoupling components__ from their dependencies, it becomes easier to replace or modify those dependencies without affecting the rest of the application. This can make it easier to evolve the application over time, as requirements change or new technologies become available.
- There are several different types of dependency injection, including __constructor injection__, __setter injection__, and __interface injection__. Each of these approaches has its own strengths and weaknesses, and the choice of which to use will depend on the specific needs of the application.
- Angular has built in Dependency Injection support.
## Example
- A class called OrderProcessor that is responsible for processing orders in an e-commerce application. The OrderProcessor class has a dependency on a PaymentProcessor class, which handles the payment processing for the orders.
- _Without dependency injection_, the OrderProcessor class might create an instance of the _PaymentProcessor class directly in its constructor or somewhere else in the class_. This tightly couples the OrderProcessor class to the PaymentProcessor class, making it difficult to test the OrderProcessor class in isolation.
- __With dependency injection__, the OrderProcessor class can be designed to receive __an instance of the PaymentProcessor class as a parameter in its constructor__. This allows the PaymentProcessor class to be easily replaced with a mock or a stub during testing. For example, you could create a mock PaymentProcessor that always returns a successful payment result for testing purposes.
```typescript
class OrderProcessor {
  private paymentProcessor!: PaymentProcessor; // Use as a parameter 
  
  public OrderProcessor(paymentProcessor: PaymentProcessor) { // Call function with dependencies as parameters
    this.paymentProcessor = paymentProcessor;
  }
  
  public void processOrder(order: Order) {
    // Process the order
    let result: PaymentResult = paymentProcessor.processPayment(order);
    // Handle the payment result
  }
}
```
## How does dependency injection help with decoupling of application components?
Dependency injection helps with decoupling of application components by __separating the creation and management of objects from their use__. _Instead of a component creating or searching for its dependencies, it receives them from an external source_. This external source could be a dependency injection container or a factory method that creates and injects the dependencies.

By receiving its dependencies from an external source, a component becomes more independent and less tightly coupled to its dependencies. The component doesn't need to know how its dependencies are created or where they come from, it just needs to know how to use them.

In Angular, coupling can occur when components and services are tightly dependent on each other. This can happen when a component has direct access to a service instance, or when a component or service relies on a specific implementation of another component or service.
Example for coupling:
```typescript
import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  users: any[];
  
  constructor(private userService: UserService) {}
  
  ngOnInit() {
    this.users = this.userService.getUsers();
  }
}
```
The UserListComponent directly injects an instance of the UserService into its constructor. This creates a tight coupling between the UserListComponent and the UserService, which can make it difficult to test the UserListComponent in isolation or to modify or replace the UserService without affecting the UserListComponent.

To reduce coupling in Angular, it's often a good practice to use interfaces to define the contracts between components and services. This allows components and services to depend on abstractions rather than specific implementations.
Example for decoupling:
```typescript
export interface UserService {
  getUsers(): any[];
}
```
And then create a concrete implementation of the UserService that implements this interface:
```typescript
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceImpl implements UserService {
  getUsers(): any[] {
    // implementation here
  }
}
```
Now, we can inject the UserService interface into the UserListComponent, instead of the concrete UserServiceImpl
```typescript
import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  users: any[];
  
  constructor(private userService: UserService) {}
  
  ngOnInit() {
    this.users = this.userService.getUsers();
  }
}
```
This reduces coupling, as the UserListComponent is now dependent on the UserService interface, rather than the specific implementation of the UserService. This makes it easier to swap out the UserService implementation, or to provide a mock or stub implementation of the UserService during testing.

## Should i call userService.getUsers(); in constructor or ngOnInit?
In Angular, it's generally recommended to call services and perform data fetching operations within the `ngOnInit()` lifecycle hook, rather than the constructor.

The constructor is only called once, when the component is first instantiated. At this point, the view and the component's properties may not be fully initialized yet. Therefore, it's not a good idea to perform data fetching or other complex operations in the constructor, as it could cause unexpected behavior or errors.

On the other hand, the `ngOnInit()` lifecycle hook is called after the component's properties and inputs have been initialized, but before the view has been fully rendered. This makes it a good place to perform data fetching operations and other initialization tasks.

So in your example, you should call `userService.getUsers();` within the `ngOnInit()` lifecycle hook:
```typescript
import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  users: any[];
  
  constructor(private userService: UserService) {}
  
  ngOnInit() {
    this.users = this.userService.getUsers();
  }
}
```
This ensures that the component's properties and inputs are fully initialized before the data fetching operation is performed, which can help to prevent unexpected behavior or errors.



