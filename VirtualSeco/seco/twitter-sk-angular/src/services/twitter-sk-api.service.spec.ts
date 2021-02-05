import { TestBed } from '@angular/core/testing';

import { TwitterSkApiService } from './twitter-sk-api.service';

describe('TwitterSkApiService', () => {
  let service: TwitterSkApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwitterSkApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
