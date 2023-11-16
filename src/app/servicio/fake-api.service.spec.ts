import { TestBed } from '@angular/core/testing';
import { FakeApiService } from './fake-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FakeApiService', () => {
  let service: FakeApiService;

  beforeEach(() => {
      TestBed.configureTestingModule({
        providers:[FakeApiService],
        imports:[HttpClientTestingModule]
      });

    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
