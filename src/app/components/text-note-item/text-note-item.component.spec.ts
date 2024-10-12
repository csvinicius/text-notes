import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextNoteItemComponent } from './text-note-item.component';

describe('TextNoteItemComponent', () => {
  let component: TextNoteItemComponent;
  let fixture: ComponentFixture<TextNoteItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextNoteItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextNoteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
