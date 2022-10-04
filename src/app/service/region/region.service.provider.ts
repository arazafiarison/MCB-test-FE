import { RegionService } from "./region.service";
import { RegionServiceACI } from "./region.service.aci";

export const RegionServiceProvider = [
    { provide: RegionServiceACI, useClass: RegionService }
]