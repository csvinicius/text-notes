import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TextNotesListComponent } from './text-notes-list/text-notes-list.component';

const routes: Routes = [
  {
    path: '',
    component: TextNotesListComponent
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./text-note-detail/text-note-detail.component').then(
        (m) => m.TextNoteDetailComponent
      )
  },
  {
    path: ':id',
    loadChildren: () =>
      import('./text-note-detail/text-note-detail.component').then(
        (m) => m.TextNoteDetailComponent
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TextNotesListModule {}
