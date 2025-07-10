import { TestBed } from '@angular/core/testing';

import { ResearchNotesService } from './research-notes.service';

describe('ResearchNotesService', () => {
  let service: ResearchNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResearchNotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
