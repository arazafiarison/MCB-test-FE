import { AuthenticationRestService } from "./authentication-rest.service";
import { AuthenticationRestServiceACI } from "./authentication-rest.service.aci";

export const AuthenticationRestServiceProvider = [
    { provide: AuthenticationRestServiceACI, useClass: AuthenticationRestService }
];