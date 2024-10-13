import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITextNotes } from '../text-notes.model';
import { of, switchMap, tap } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-text-note-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './text-note-item.component.html',
  styleUrl: './text-note-item.component.scss'
})
export class TextNoteItemComponent {
  @Input('note') note: ITextNotes;
  @Output('refresh-list') refreshList: EventEmitter<boolean> = new EventEmitter();

  constructor(private _apiService: ApiService) { }

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

}
