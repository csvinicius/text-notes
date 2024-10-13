import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TextNotesListComponent } from './text-notes-list/text-notes-list.component';
import { TextNoteDetailComponent } from './text-note-detail/text-note-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: TextNotesListComponent
      },
      {
        path: 'create',
        component: TextNoteDetailComponent
      },
      {
        path: ':id',
        component: TextNoteDetailComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TextNotesModule { }
