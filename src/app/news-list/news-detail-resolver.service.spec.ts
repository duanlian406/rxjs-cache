import { TestBed, inject } from '@angular/core/testing';

import { NewsDetailResolverService } from './news-detail-resolver.service';

describe('NewsDetailResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewsDetailResolverService]
    });
  });

  it('should be created', inject([NewsDetailResolverService], (service: NewsDetailResolverService) => {
    expect(service).toBeTruthy();
  }));
});
