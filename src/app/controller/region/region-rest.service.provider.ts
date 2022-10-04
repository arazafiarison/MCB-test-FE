import { RegionRestService } from "./region-rest.service";
import { RegionRestServiceACI } from "./region-rest.service.aci";

export const RegionRestServiceProvider = [
    { provide: RegionRestServiceACI, useClass: RegionRestService }
];