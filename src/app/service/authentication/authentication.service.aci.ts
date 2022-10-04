import { Observable } from "rxjs";
import { LoginRequestDTO } from "src/app/model/dto/authentication/login-request-dto";

export abstract class AuthenticationServiceACI {
    public abstract signIn(loginRequest: LoginRequestDTO): Observable<boolean>; 
    public abstract isAuthenticated(): boolean;
}