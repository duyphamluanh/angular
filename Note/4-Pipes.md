In Angular, pipes are a way to transform data in your templates. 
They allow you to filter, format, and manipulate data before it is displayed to the user.
Pipes are like functions that take an input value and return a transformed value. You can use pipes in your templates to transform data in real-time, without modifying the underlying data.
Angular comes with several built-in pipes that you can use, such as DatePipe, UpperCasePipe, LowerCasePipe, CurrencyPipe, and DecimalPipe. You can also create your own custom pipes to transform data in a way that is specific to your application's needs.

Built-in Pipes:
- __UpperCasePipe__: This pipe transforms a string to all uppercase letters. For example:
```typescript
<div>{{ 'hello world' | uppercase }}</div>
<!-- Output: <div>HELLO WORLD</div> -->
```
- __LowerCasePipe__: This pipe transforms a string to all lowercase letters. For example:
```typescript
<div>{{ 'HELLO WORLD' | lowercase }}</div>
<!-- Output: <div>hello world</div> -->
```
- __DecimalPipe__: This pipe formats a number as a decimal according to specified formatting rules. For example:
```typescript
<div>{{ 42.123456 | number:'1.2-3' }}</div>
<!-- Output: <div>42.123</div> -->
```
- __CurrencyPipe__: This pipe formats a number as currency according to specified formatting rules. For example:
```typescript
<div>{{ 1000 | currency:'USD':'symbol':'1.2-2' }}</div>
<!-- Output: <div>$1,000.00</div> -->
```
- __PercentPipe__: This pipe formats a number as a percentage. For example:
```typescript
<div>{{ 0.5 | percent }}</div>
<!-- Output: <div>50%</div> -->
```
- __SlicePipe__: This pipe is used to select a subset of an array or string. For example:
```typescript
<div>{{ 'Hello, world!' | slice:0:5 }}</div>
<!-- Output: <div>Hello</div> -->
```

- __JsonPipe__: This pipe transforms an object into a JSON string. For example:
```typescript
<div>{{ { name: 'John', age: 30, city: 'New York' } | json }}</div>
<!-- Output: <div>{"name":"John","age":30,"city":"New York"}</div> -->
```

- __AsyncPipe__: This pipe is used to handle asynchronous data streams. It subscribes to an observable or promise and automatically updates the view when new data arrives. For example:
```typescript
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-component',
  template: `
    <div>
      {{ message$ | async }}
    </div>
  `
})
export class MyComponent {
  message$: Observable<string>;

  constructor() {
    this.message$ = new Observable(observer => {
      setTimeout(() => {
        observer.next('Hello, world!');
      }, 3000);
    });
  }
}
```

Example:
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-component',
  template: `
    <div>
      The current date and time is: {{ currentDate | date:'fullDate' }}
    </div>
  `
})
export class MyComponent {
  currentDate = new Date();
}
```