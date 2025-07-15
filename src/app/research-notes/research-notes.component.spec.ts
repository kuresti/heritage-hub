import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchNotesComponent } from './research-notes.component';

describe('ResearchNotesComponent', () => {
  let component: ResearchNotesComponent;
  let fixture: ComponentFixture<ResearchNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResearchNotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResearchNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
