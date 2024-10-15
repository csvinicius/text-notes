import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { TextNotesListComponent } from './text-notes-list.component';
import { ApiService } from '../../services/api.service';
import { MessageService } from '../../services/message.service';
import { ITextNotes } from '../text-notes.model';
import { TextNoteItemComponent } from "../text-note-item/text-note-item.component";
import { ActivatedRoute } from '@angular/router';

describe('TextNotesListComponent', () => {
  let component: TextNotesListComponent;
  let fixture: ComponentFixture<TextNotesListComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockMessageService: jasmine.SpyObj<MessageService>;
  let messageSubject: Subject<string>;

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('ApiService', ['getAll']);
    mockMessageService = jasmine.createSpyObj('MessageService', ['getMessage']);

    messageSubject = new Subject<string>();
    mockMessageService.getMessage.and.returnValue(messageSubject.asObservable());

    await TestBed.configureTestingModule({
      imports: [TextNotesListComponent, TextNoteItemComponent],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: MessageService, useValue: mockMessageService },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }),
          },
        },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TextNotesListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getNotesList on ngOnInit', () => {
    const mockNotesList: ITextNotes[] = [{ id: 1, title: 'Test Note', content: 'Test Content' }];
    mockApiService.getAll.and.returnValue(of(mockNotesList));

    fixture.detectChanges();

    expect(mockApiService.getAll).toHaveBeenCalledWith('text-notes');
    component.$notesList.subscribe((notes) => {
      expect(notes).toEqual(mockNotesList);
    });
  });

  it('should refresh the list when receiving a "refreshList" message', () => {
    const mockNotesList: ITextNotes[] = [{ id: 1, title: 'Test Note', content: 'Test Content' }];
    mockApiService.getAll.and.returnValue(of(mockNotesList));

    messageSubject.next('refreshList');

    expect(mockApiService.getAll).toHaveBeenCalledTimes(1);
  });

  it('should not refresh the list for unrelated messages', () => {
    messageSubject.next('unrelatedMessage');

    expect(mockApiService.getAll).not.toHaveBeenCalled();
  });

  afterEach(() => {
    if (component.messageSubscription) {
      component.messageSubscription.unsubscribe();
    }
  });
});