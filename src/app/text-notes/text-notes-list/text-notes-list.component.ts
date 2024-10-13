import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MessageService } from '../../services/message.service';
import { ITextNotes } from '../text-notes.model';
import { Observable, Subscription } from 'rxjs';
import { TextNoteItemComponent } from "../text-note-item/text-note-item.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-text-notes-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TextNoteItemComponent],
  templateUrl: './text-notes-list.component.html',
  styleUrl: './text-notes-list.component.scss'
})
export class TextNotesListComponent implements OnInit {
  $notesList: Observable<ITextNotes[]>;
  messageSubscription: Subscription;
  
  constructor(private _apiService: ApiService, private _messageService: MessageService) {
    this.messageSubscription = 
      this._messageService
        .getMessage()
        .subscribe((message) => {
          if (message ==='refreshList') {
            this.getNotesList();
          }
        })
   }

  ngOnInit(): void {
   this.getNotesList();
  }

  getNotesList(): Observable<ITextNotes[]> {
    return this.$notesList = this._apiService.getAll('text-notes');
  }
}
