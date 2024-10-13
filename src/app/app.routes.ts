import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'text-notes',
    loadChildren: () =>
      import('./text-notes/text-notes-list.module').then(
        (m) => m.TextNotesListModule
      )
  },
  { path: '', redirectTo: '/text-notes', pathMatch: 'full' },
  { path: '**', redirectTo: '/text-notes' }
];
