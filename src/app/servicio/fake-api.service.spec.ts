import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FakeApiService } from './fake-api.service';

describe('FakeApiService', () => {
  let service: FakeApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FakeApiService],
    });
    service = TestBed.inject(FakeApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a user', () => {
    const mockUser = { username: 'testUser' };

    service.agregarUsuario(mockUser).subscribe((response) => {
      expect(response).toEqual(mockUser);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/users');
    expect(req.request.method).toEqual('POST');
    req.flush(mockUser);
  });

  it('should get users', () => {
    const mockUsers = [{ username: 'user1' }, { username: 'user2' }];

    service.obtenerUsuarios().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/users');
    expect(req.request.method).toEqual('GET');
    req.flush(mockUsers);
  });
});