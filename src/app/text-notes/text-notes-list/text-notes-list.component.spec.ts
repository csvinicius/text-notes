import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextNotesListComponent } from './text-notes-list.component';

describe('TextNotesListComponent', () => {
  let component: TextNotesListComponent;
  let fixture: ComponentFixture<TextNotesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextNotesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextNotesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
