import { TestBed, inject } from '@angular/core/testing';

import { NewsListResolverService } from './news-list-resolver.service';

describe('NewsListResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewsListResolverService]
    });
  });

  it('should be created', inject([NewsListResolverService], (service: NewsListResolverService) => {
    expect(service).toBeTruthy();
  }));
});
