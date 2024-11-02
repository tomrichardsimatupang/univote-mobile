import { TestBed } from '@angular/core/testing';

import { DocumentumService } from './documentum.service';

describe('DocumentumService', () => {
  let service: DocumentumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
