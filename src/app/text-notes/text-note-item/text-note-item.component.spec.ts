import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ITextNotes } from '../text-notes.model';
import { of } from 'rxjs';
import { ApiService } from '../../services/api.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { TextNoteItemComponent } from './text-note-item.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventEmitter } from '@angular/core';

describe('TextNoteItemComponent', () => {
  let component: TextNoteItemComponent;
  let fixture: ComponentFixture<TextNoteItemComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('ApiService', ['delete']);

    await TestBed.configureTestingModule({
      imports: [TextNoteItemComponent, RouterLink],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }),
          },
        },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TextNoteItemComponent);
    component = fixture.componentInstance;

    component.refreshList = new EventEmitter<boolean>();
    spyOn(component.refreshList, 'emit');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call _confirmationDialog and then delete the note if confirmed', fakeAsync(() => {
    const note: ITextNotes = { id: 1, title: 'Test Note', content: 'Test Content' };
    component.note = note;

    const swalResult: SweetAlertResult = {
      isConfirmed: true,
      isDenied: false,
      isDismissed: false,
      value: undefined,
    };

    spyOn(Swal, 'fire').and.returnValue(Promise.resolve(swalResult));
    mockApiService.delete.and.returnValue(of(true));

    component.deleteNote(note.id, note.title);
    tick();


    expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({
      title: jasmine.any(String),
      text: jasmine.any(String),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F54766',
      cancelButtonColor: '#06929f',
      reverseButtons: true,
      confirmButtonText: 'Sim, quero excluir!',
      customClass: {
        popup: 'swal__popup-container',
      },
    }));

    expect(mockApiService.delete).toHaveBeenCalledWith('text-notes', note.id);
    expect(component.refreshList.emit).toHaveBeenCalledWith(true);
  }));

  it('should not call delete if the confirmation is rejected', fakeAsync(() => {
    const note: ITextNotes = { id: 1, title: 'Test Note', content: 'Test Content' };
    component.note = note;

    const swalResult: SweetAlertResult = {
      isConfirmed: false,
      isDenied: false,
      isDismissed: true,
      value: undefined,
    };

    spyOn(Swal, 'fire').and.returnValue(Promise.resolve(swalResult));

    component.deleteNote(note.id, note.title);
    tick();

    expect(Swal.fire).toHaveBeenCalled();
    expect(mockApiService.delete).not.toHaveBeenCalled();
    expect(component.refreshList.emit).not.toHaveBeenCalled();
  }));
});