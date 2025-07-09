import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchNotesListComponent } from './research-notes-list.component';

describe('ResearchNotesListComponent', () => {
  let component: ResearchNotesListComponent;
  let fixture: ComponentFixture<ResearchNotesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResearchNotesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResearchNotesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
