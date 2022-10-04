import { AuthenticationService } from "./authentication.service";
import { AuthenticationServiceACI } from "./authentication.service.aci";

export const AuthenticationServiceProvider = [
    { provide: AuthenticationServiceACI, useClass: AuthenticationService } 
];