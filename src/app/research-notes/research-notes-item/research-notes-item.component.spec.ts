import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchNotesItemComponent } from './research-notes-item.component';

describe('ResearchNotesItemComponent', () => {
  let component: ResearchNotesItemComponent;
  let fixture: ComponentFixture<ResearchNotesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResearchNotesItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResearchNotesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
