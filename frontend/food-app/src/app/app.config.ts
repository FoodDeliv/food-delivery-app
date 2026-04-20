import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
<<<<<<< HEAD
import { provideHttpClient } from '@angular/common/http'; 
=======
import { provideHttpClient, withInterceptors } from '@angular/common/http'; 

>>>>>>> 9e5c6dc834bc0a38655557944517bd879b49b812
import { routes } from './app.routes';
import { authInterceptor } from './auth.interceptor'; 

export const appConfig: ApplicationConfig = {
  providers: [
<<<<<<< HEAD
    provideRouter(routes),
    provideHttpClient() 
=======
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
>>>>>>> 9e5c6dc834bc0a38655557944517bd879b49b812
  ]
};