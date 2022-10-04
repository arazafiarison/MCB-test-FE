import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JWTResponseDTO } from 'src/app/model/dto/authentication/jwt-response-dto';
import { LoginRequestDTO } from 'src/app/model/dto/authentication/login-request-dto';
import { HttpMethodEnum, HttpRestService } from 'src/app/shared/service/http-rest/http-rest.service';
import { HttpRestServiceACI } from 'src/app/shared/service/http-rest/http-rest.service.aci';
import { environment } from 'src/environments/environment';
import { AuthenticationRestServiceACI } from './authentication-rest.service.aci';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationRestService implements AuthenticationRestServiceACI {

  private apiURL = `${environment.restApiUrl}/authentication`;

  constructor(
    private httpRestService: HttpRestServiceACI<any>
  ) {}

  /**
   * Sign in : OAuth (JWT)
   * @param loginRequest 
   * @returns 
   */
  public signIn(loginRequest: LoginRequestDTO): Observable<JWTResponseDTO> {
    return this.httpRestService.customAPICall<JWTResponseDTO>(
      HttpMethodEnum.POST,
      `${this.apiURL}/signIn`,
      loginRequest
    );
  }
}
