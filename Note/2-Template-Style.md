1. __Inline template__: With this approach, you define the HTML template directly within the component file using the template property of the @Component decorator. For example:

```typescript
@Component({
  selector: 'my-component',
  template: '<h1>Hello, {{name}}!</h1>'
})
export class MyComponent {
  name = 'World';
}
```
In this example, the template defines a simple heading with a __dynamic text__ interpolation that displays the value of the `name` property.

The main advantage of using an __inline template__ is that it keeps the HTML and __component code__ together in a single file, which can be helpful for small components or for components that have a simple template. However, for larger or more complex templates, an inline template can become hard to read and maintain.

2. __URL template__: With this approach, you define the HTML template in a separate HTML file and reference it using the templateUrl property of the @Component decorator. For example:

```typescript
@Component({
  selector: 'my-component',
  templateUrl: './my-component.component.html'
})
export class MyComponent {
  name = 'World';
}
```
The main advantage of using a __URL template__ is that it allows you to separate the HTML and component code into separate files, which can make the code easier to read and maintain. It also allows you to reuse the same template in multiple components by referencing the same URL.
However, one potential disadvantage of using a URL template is that it requires an additional HTTP request to load the template file. This can add some overhead to the __application startup time__  especially if there are many templates that need to be loaded.

## Binding syntax
### Interpolation: 
Interpolation is the ability to display dynamic values in your template. To use interpolation, you enclose the expression in __double curly braces__ (__{{ }}__) and Angular will display the result of the expression in the template.
```html
<p>Room name: <strong>{{hotelName}}</strong></p>
```
### Property binding: 
Property binding allows you to bind a property of an element to a value in your component. To use property binding, you enclose the property name in __square brackets__ (__[ ]__) and set the value to the name of the property in your component.
```html
<div [innerText]="'Current quantity: ' + numberOfRooms"></div>
```

### Event binding: 
Event binding allows you to bind an event of an element to a method in your component. To use event binding, you enclose the event name in __parentheses__ (__( )__) and set the value to the name of the method in your component.




