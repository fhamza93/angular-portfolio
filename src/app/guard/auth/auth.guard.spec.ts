import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../../service/auth/auth.service'; 
import { Router } from '@angular/router'; 
import { of } from 'rxjs';

describe('AuthGuard', () => {
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let routerMock: jasmine.SpyObj<Router>;
  let guard: AuthGuard;

  beforeEach(() => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access if user is logged in', (done) => {
    authServiceMock.isLoggedIn.and.returnValue(of(true)); 

    const canActivate = guard.canActivate({} as any, {} as any);
    
    canActivate.subscribe(result => {
      expect(result).toBeTrue(); 
      done(); 
    });
  });

  it('should deny access if user is not logged in', (done) => {
    authServiceMock.isLoggedIn.and.returnValue(of(false)); 

    const canActivate = guard.canActivate({} as any, {} as any);
    
    canActivate.subscribe(result => {
      expect(result).toBeFalse();
      expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
      done(); 
    });
  });
});
