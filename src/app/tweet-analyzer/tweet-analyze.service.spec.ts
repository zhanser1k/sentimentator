import { TestBed, inject } from '@angular/core/testing';

import { TweetAnalyzeService } from './tweet-analyze.service';

describe('TweetAnalyzeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TweetAnalyzeService]
    });
  });

  it('should be created', inject([TweetAnalyzeService], (service: TweetAnalyzeService) => {
    expect(service).toBeTruthy();
  }));
});
