import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ITextNotes } from '../../interfaces/text-notes';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-text-notes-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text-notes-list.component.html',
  styleUrl: './text-notes-list.component.scss'
})
export class TextNotesListComponent implements OnInit {
  $notesList: Observable<ITextNotes[]>;
  
  constructor(private _apiService: ApiService) { }

  ngOnInit(): void {
    this.$notesList = this._apiService.getAll('text-notes');
  }
}
