import { Observable } from "rxjs";
import { JWTResponseDTO } from "src/app/model/dto/authentication/jwt-response-dto";
import { LoginRequestDTO } from "src/app/model/dto/authentication/login-request-dto";

export abstract class AuthenticationRestServiceACI {
    public abstract signIn(loginRequest: LoginRequestDTO): Observable<JWTResponseDTO>
}