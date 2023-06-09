import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { NestFactory } from '@nestjs/core';

// async function bootsrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }

// bootsrap()
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
