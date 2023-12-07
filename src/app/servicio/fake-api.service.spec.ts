import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FakeApiService } from './fake-api.service';
import { HttpErrorResponse } from '@angular/common/http';

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
//------------------------------------------------------------------------------------------------------- 1
  it('should add a user', () => {
    const mockUser = { username: 'testUser' };

    service.agregarUsuario(mockUser).subscribe((response) => {
      expect(response).toEqual(mockUser);
    });

    const req = httpTestingController.expectOne('https://fake-api-puce.vercel.app/users');
    expect(req.request.method).toEqual('POST');
    req.flush(mockUser);
  });
//------------------------------------------------------------------------------------------------------- 2
  it('should get users', () => {
    const mockUsers = [{ username: 'user1' }, { username: 'user2' }];

    service.obtenerUsuarios().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpTestingController.expectOne('https://fake-api-puce.vercel.app/users');
    expect(req.request.method).toEqual('GET');
    req.flush(mockUsers);
  });

//------------------------------------------------------------------------------------------------------- 3
  it('should handle error', () => {
    const mockError = new HttpErrorResponse({
      error: 'Test error',
      status: 500,
      statusText: 'Internal Server Error',
    });

    service.handleError(mockError).subscribe(
      () => {},
      (error) => {
        expect(error).toEqual('Algo salió mal; por favor, inténtalo de nuevo más tarde.');
      }
    );
  });
});