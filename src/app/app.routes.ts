import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'text-notes',
    loadComponent: () => import('./components/text-notes-list/text-notes-list.component').then(m => m.TextNotesListComponent) // Lazy load the list component
  },
  {
    path: 'text-notes/create',
    loadComponent: () => import('./components/text-note-detail/text-note-detail.component').then(m => m.TextNoteDetailComponent)
  },
  {
    path: 'text-notes/:id',
    loadComponent: () => import('./components/text-note-detail/text-note-detail.component').then(m => m.TextNoteDetailComponent)
  },
  { path: '', redirectTo: '/text-notes', pathMatch: 'full' },
  { path: '**', redirectTo: '/text-notes' }
];
