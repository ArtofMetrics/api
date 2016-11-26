import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from 'client/app/app.module';

const platform = platformBrowserDynamic();

/**
 * Only enable prod mode in production builds. Development mode helps to debug/identify potential bugs
 * in the codebase, which is unnecessary in production. This type of feature did NOT exist in Angular 1.x,
 * see https://angular.io/docs/ts/latest/api/core/index/enableProdMode-function.html
 * 
 */
console.log(`Using ${ APP_ENV }...`);
if (APP_ENV === 'production') {
  enableProdMode();
}
platform.bootstrapModule(AppModule);
