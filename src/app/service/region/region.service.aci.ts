import { Observable } from "rxjs";
import { RegionListElementDTO } from "src/app/model/dto/region/region-list-element-dto";

export abstract class RegionServiceACI {
    public abstract findAll(): Observable<Array<RegionListElementDTO>>;
}