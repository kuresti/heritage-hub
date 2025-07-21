import { TestBed } from '@angular/core/testing';

import { FamilyRelationService } from './people/family-relation.service';

describe('FamilyRelationService', () => {
  let service: FamilyRelationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamilyRelationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
