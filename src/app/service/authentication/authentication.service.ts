import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { AuthenticationRestServiceACI } from 'src/app/controller/authentication/authentication-rest.service.aci';
import { JWTResponseDTO } from 'src/app/model/dto/authentication/jwt-response-dto';
import { LoginRequestDTO } from 'src/app/model/dto/authentication/login-request-dto';
import { AuthenticationServiceACI } from './authentication.service.aci';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements AuthenticationServiceACI {

  constructor(
    private authenticationServiceRest: AuthenticationRestServiceACI,
    private jwtHelperService: JwtHelperService
  ) { }

  public signIn(loginRequest: LoginRequestDTO): Observable<boolean> {
    return this.authenticationServiceRest.signIn(loginRequest).pipe(
      take(1),
      map((jwt: JWTResponseDTO) => {
        if (jwt?.accessToken) {
          localStorage.setItem('access_token', jwt.accessToken);
          return true;
        } else {
          return false;
        }
      })
    );
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !this.jwtHelperService.isTokenExpired(token);
  }
}
