import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('../app/auth/login/login').then(
        (m) => m.LoginComponent
      ),
  },  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/home/home').then((m) => m.HomeComponent),
    children: [
      {
        path: 'data-grid',
        loadComponent: () =>
          import('./dashboard/data-grid/data-grid').then(
            (m) => m.DataGridComponent
          ),
      },
      {
        path: 'charts',
        loadComponent: () =>
          import('./dashboard/charts/charts').then(
            (m) => m.ChartsComponent
          ),
      },
      {
        path: 'voice-recorder',
        loadComponent: () =>
          import('./dashboard/voice-recorder/voice-recorder').then(
            (m) => m.VoiceRecorderComponent
          ),
      },
      {
  path: 'mock-websocket',
  loadComponent: () =>
    import('./dashboard/mock-websocket/mock-websocket').then(m => m.MockWebsocketComponent)
}
,
      { path: '', redirectTo: 'data-grid', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
