import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchNotesEditComponent } from './research-notes-edit.component';

describe('ResearchNotesEditComponent', () => {
  let component: ResearchNotesEditComponent;
  let fixture: ComponentFixture<ResearchNotesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResearchNotesEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResearchNotesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
