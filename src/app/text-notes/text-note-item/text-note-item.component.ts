import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITextNotes } from '../text-notes.model';
import { of, switchMap, tap } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

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

  private _confirmationDialog(title: String): Promise<boolean> {
    return Swal.fire({
      title: `Você tem certeza que deseja excluir a nota ${title}?`,
      text: 'Essa ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F54766',
      cancelButtonColor: '#06929f',
      reverseButtons: true,
      confirmButtonText: 'Sim, quero excluir!',
      customClass: {
        popup: 'swal__popup-container'
      }
    }).then((result) => result.isConfirmed);
  }

  deleteNote(id: Number | undefined, title: String): void {
    this._confirmationDialog(title)
      .then((isConfirmed) => {
        if (isConfirmed) {
          of(null)
          .pipe(
            switchMap(() => this._apiService.delete('text-notes', id)),
            tap((success: boolean) => {
              if (success) {
                this.refreshList.emit(true);
                Swal.fire('', 'Nota deletada com sucesso', 'success');
              }
            })
          )
          .subscribe();
        }
      });
  }



}
