import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextNoteDetailComponent } from './text-note-detail.component';

describe('TextNoteDetailComponent', () => {
  let component: TextNoteDetailComponent;
  let fixture: ComponentFixture<TextNoteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextNoteDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextNoteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
