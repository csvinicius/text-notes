import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'text-notes',
    loadChildren: () =>
      import('./text-notes/text-notes.module').then(
        (m) => m.TextNotesModule
      )
  },
  { path: '', redirectTo: '/text-notes', pathMatch: 'full' },
  { path: '**', redirectTo: '/text-notes' }
];
