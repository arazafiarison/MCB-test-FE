import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegionRestServiceACI } from 'src/app/controller/region/region-rest.service.aci';
import { RegionListElementDTO } from 'src/app/model/dto/region/region-list-element-dto';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor(
    private regionServiceRest: RegionRestServiceACI
  ) { }

  public findAll(): Observable<Array<RegionListElementDTO>> {
    return this.regionServiceRest.findAll();
  }
}
