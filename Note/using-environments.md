## Using environment
To create an environment file, you can use the ng generate command with the --env option, like this:
`ng generate environment environmentName`
This will create a new file called environment.ts in the src/environments directory. The environment.ts file contains a default configuration that you can modify based on your needs. Here's an example of what the environment.ts file might look like:
```js
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

To use the environment variables in your application, you can import the environment object and access the properties that you need, like this:
```js
import { environment } from '../environments/environment';

console.log(environment.production); // Output: false
console.log(environment.apiUrl); // Output: http://localhost:3000/api
```
In this example, we're importing the environment object from the environment.ts file, and we're accessing the production and apiUrl properties of the object using dot notation. We can use these properties to configure our application based on the environment that we're running in.

## Please set on environment.developtment.ts just like evironment.ts when developing or you'll be F*** up :<