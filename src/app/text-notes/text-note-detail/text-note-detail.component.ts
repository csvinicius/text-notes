import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ITextNotes } from '../text-notes.model';
import { ApiService } from '../../services/api.service';
import { MessageService } from '../../services/message.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-text-note-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './text-note-detail.component.html',
  styleUrl: './text-note-detail.component.scss'
})
export class TextNoteDetailComponent implements OnInit {
  noteForm: FormGroup;
  $note: Observable<ITextNotes>;
  noteId: Number;

  constructor(
    private _apiService: ApiService,
    private _messageService: MessageService,
    private _route: ActivatedRoute) {
    this.noteForm = new FormGroup({
      id: new FormControl(null),
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
    });
    this.noteId = this._route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getNote();
  }

  getNote(): void {
    if (this.noteId) {
      this.$note = this._apiService.get('text-notes', this.noteId);
      this.$note.subscribe(note => {
        this.noteForm.patchValue({
          id: note.id,
          title: note.title,
          content: note.content
        });
      });
    }
  }

  formSubmit(): void {
    if (this.noteId) {
      this.editNote();
    } else {
      this.createNote();
    }
  }

  createNote(): void {
    if (this.noteForm.valid) {
      const noteData = this.noteForm.value;
      this._apiService
        .post('text-notes', noteData)
        .pipe(
          tap((response) => {
            if (response) {
              this._messageService.sendMessage('refreshList');
              this.clearForm();
              Swal.fire('', 'Nota criada com sucesso', 'success');
            }
          })
        )
        .subscribe();
    }
  }

  editNote(): void {
    if (this.noteForm.valid) {
      const noteData = this.noteForm.value;
      this._apiService
        .put('text-notes', noteData)
        .pipe(
          tap((response) => {
            if (response) {
              this._messageService.sendMessage('refreshList');
              Swal.fire('', 'Nota alterada com sucesso', 'success');
            }
          })
        )
        .subscribe();
    }
  }

  clearForm(): void {
    this.noteForm.reset();
  }
}
