import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchNotesDetailsComponent } from './research-notes-details.component';

describe('ResearchNotesDetailsComponent', () => {
  let component: ResearchNotesDetailsComponent;
  let fixture: ComponentFixture<ResearchNotesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResearchNotesDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResearchNotesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
