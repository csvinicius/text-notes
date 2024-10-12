import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITextNotes } from '../../interfaces/text-notes';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-text-note-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text-note-detail.component.html',
  styleUrl: './text-note-detail.component.scss'
})
export class TextNoteDetailComponent implements OnInit {
  $note: Observable<ITextNotes>;
  noteId: Number;

  constructor(private _apiService: ApiService, private _route: ActivatedRoute) {
    this.noteId = this._route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.$note = this._apiService.get('text-notes', this.noteId);
  }
}
