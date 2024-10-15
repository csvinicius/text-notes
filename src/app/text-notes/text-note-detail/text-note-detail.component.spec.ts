import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextNoteDetailComponent } from './text-note-detail.component';
import { ApiService } from '../../services/api.service';
import { MessageService } from '../../services/message.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { ITextNotes } from '../text-notes.model';

describe('TextNoteDetailComponent', () => {
  let component: TextNoteDetailComponent;
  let fixture: ComponentFixture<TextNoteDetailComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockMessageService: jasmine.SpyObj<MessageService>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('ApiService', ['get', 'post', 'put']);
    mockMessageService = jasmine.createSpyObj('MessageService', ['sendMessage']);
    mockActivatedRoute = {
      snapshot: {
        params: {
          id: 1,
        },
      },
    };

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TextNoteDetailComponent,
      ],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: MessageService, useValue: mockMessageService },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TextNoteDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch note details on initialization', () => {
    const mockNote: ITextNotes = { id: 1, title: 'Test Note', content: 'Test Content' };
    mockApiService.get.and.returnValue(of(mockNote));

    component.ngOnInit();

    expect(mockApiService.get).toHaveBeenCalledWith('text-notes', 1);
    component.$note.subscribe(note => {
      expect(note).toEqual(mockNote);
      expect(component.noteForm.value).toEqual({
        id: 1,
        title: 'Test Note',
        content: 'Test Content',
      });
    });
  });

  it('should edit an existing note when the form is valid', () => {
    const mockNote: ITextNotes = { id: 1, title: 'Updated Note', content: 'Updated Content' };
    component.noteForm.setValue(mockNote);
    mockApiService.put.and.returnValue(of(mockNote)); // Return the updated note

    const swalResult: SweetAlertResult = {
      isConfirmed: true,
      isDenied: false,
      isDismissed: false,
      value: undefined,
    };

    spyOn(Swal, 'fire').and.returnValue(Promise.resolve(swalResult));

    component.formSubmit();

    expect(mockApiService.put).toHaveBeenCalledWith('text-notes', mockNote);
    expect(mockMessageService.sendMessage).toHaveBeenCalledWith('refreshList');
  });
});