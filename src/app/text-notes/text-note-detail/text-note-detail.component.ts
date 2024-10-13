import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ITextNotes } from '../text-notes.model';
import { ApiService } from '../../services/api.service';
import { MessageService } from '../../services/message.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-note-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './text-note-detail.component.html',
  styleUrl: './text-note-detail.component.scss'
})
export class TextNoteDetailComponent implements OnInit {
  $note: Observable<ITextNotes>;
  noteId: Number;
  data: ITextNotes = {
    title: '',
    content: ''
  };

  constructor(
    private _apiService: ApiService,
    private _messageService: MessageService,
    private _route: ActivatedRoute) {
    this.noteId = this._route.snapshot.params['id'];
  }

  ngOnInit(): void {
    if (this.noteId) {
      this.$note = this._apiService.get('text-notes', this.noteId);
    }
  }
  createNote(data: ITextNotes) {
    const newNote: ITextNotes = { title: data.title, content: data.content }
    this._apiService.post('text-notes', newNote)
      .pipe(
        tap((response) => {
          if (response) {
            this._messageService.sendMessage('refreshList');
          }
        })
      )
      .subscribe();
  }

  editNote(data: ITextNotes) {
    const newNote: ITextNotes = { title: data.title, content: data.content }
    this._apiService.put('text-notes', data.id, newNote)
      .pipe(
        tap((response) => {
          if (response) {
            this._messageService.sendMessage('refreshList');
          }
        })
      )
      .subscribe();
  }
}
