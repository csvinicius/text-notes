import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITextNotes } from '../text-notes.model';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-text-note-item',
  standalone: true,
  imports: [],
  templateUrl: './text-note-item.component.html',
  styleUrl: './text-note-item.component.scss'
})
export class TextNoteItemComponent {
  @Input('note') note: ITextNotes;
  @Output('refresh-list') refreshList: EventEmitter<boolean> = new EventEmitter();

  constructor(private _apiService: ApiService, private _router: Router) {}

  deleteNote(id: Number | undefined): void {
    of(null)
      .pipe(
        switchMap(() => this._apiService.delete('text-notes', id)),
        tap((success: boolean) => {
          if (success) {
            this.refreshList.emit(true);
          }
        })
      )
      .subscribe();
  }

  navigateToEditNote(id: Number | undefined) {
    this._router.navigate([`/text-notes/${id}`]);
  }

}
