import { HttpRestService } from "./http-rest.service";
import { HttpRestServiceACI } from "./http-rest.service.aci";

export const HttpRestServiceProvider = [
    { provide: HttpRestServiceACI, useClass: HttpRestService }
];