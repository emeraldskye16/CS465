import { HttpRequest, HttpEvent } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { JwtInterceptor } from './jwt-interceptor';
import { AuthenticationService } from '../services/authentication.service';

class AuthServiceStub {
  token = '';
  getToken(): string {
    return this.token;
  }
}

describe('JwtInterceptor', () => {
  let authService: AuthServiceStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthenticationService, useClass: AuthServiceStub },
        JwtInterceptor
      ]
    });

    authService = TestBed.inject(AuthenticationService) as unknown as AuthServiceStub;
  });

  function runInterceptor(req: HttpRequest<any>, next: (req: HttpRequest<any>) => any) {
    const interceptor = TestBed.inject(JwtInterceptor);
    return interceptor.intercept(req, { handle: next } as any);
  }

  it('should add Authorization header when token exists', async () => {
    authService.token = 'TEST_TOKEN';

    const req = new HttpRequest('GET', '/api/test');

    await firstValueFrom(
      runInterceptor(req, (updatedReq: HttpRequest<any>) => {
        expect(updatedReq.headers.get('Authorization')).toBe('Bearer TEST_TOKEN');
        return of({} as HttpEvent<any>);
      })
    );
  });

  it('should NOT add Authorization header when no token exists', async () => {
    authService.token = '';

    const req = new HttpRequest('GET', '/api/test');

    await firstValueFrom(
      runInterceptor(req, (updatedReq: HttpRequest<any>) => {
        expect(updatedReq.headers.has('Authorization')).toBe(false);
        return of({} as HttpEvent<any>);
      })
    );
  });
});
