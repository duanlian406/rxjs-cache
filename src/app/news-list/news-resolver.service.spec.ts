import { TestBed, inject } from '@angular/core/testing';

import { NewsResolverService } from './news-resolver.service';

describe('NewsResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewsResolverService]
    });
  });

  it('should be created', inject([NewsResolverService], (service: NewsResolverService) => {
    expect(service).toBeTruthy();
  }));
});
