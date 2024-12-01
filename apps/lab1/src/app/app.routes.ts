import type {Route} from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'lab1',
    loadComponent: async () =>
      import('@is/labs/lab1/shell').then((m) => m.ShellComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: async () =>
          import('@is/labs/lab1/welcome-page/feature').then(
            (m) => m.WelcomePageComponent,
          ),
      },
      {
        path: 'signup',
        pathMatch: 'full',
        loadComponent: async () =>
          import('@is/labs/lab1/signup-page/feature').then((m) => m.SignupPageComponent),
      },
      {
        path: 'signin',
        pathMatch: 'full',
        loadComponent: async () =>
          import('@is/labs/lab1/signin-page/feature').then((m) => m.SigninPageComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'lab1',
  },
];
