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

      {
        path: 'home',
        loadComponent: async () =>
          import('@is/labs/lab1/home-page/feature').then((m) => m.HomePageComponent),
        children: [
          {
            path: 'product',
            pathMatch: 'full',
            loadComponent: async () =>
              import('@is/labs/lab1/product-page/feature').then(
                (m) => m.ProductPageComponent,
              ),
          },
          {
            path: 'coordinates',
            pathMatch: 'full',
            loadComponent: async () =>
              import('@is/labs/lab1/coordinates-page/feature').then(
                (m) => m.CoordinatesPageComponent,
              ),
          },
          {
            path: 'organization',
            pathMatch: 'full',
            loadComponent: async () =>
              import('@is/labs/lab1/organization-page/feature').then(
                (m) => m.OrganizationPageComponent,
              ),
          },
          {
            path: 'person',
            pathMatch: 'full',
            loadComponent: async () =>
              import('@is/labs/lab1/person-page/feature').then(
                (m) => m.PersonPageComponent,
              ),
          },
          {
            path: 'address',
            pathMatch: 'full',
            loadComponent: async () =>
              import('@is/labs/lab1/address-page/feature').then(
                (m) => m.AddressPageComponent,
              ),
          },
          {
            path: 'location',
            pathMatch: 'full',
            loadComponent: async () =>
              import('@is/labs/lab1/location-page/feature').then(
                (m) => m.LocationPageComponent,
              ),
          },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'lab1',
  },
];
