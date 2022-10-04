import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegionListElementDTO } from 'src/app/model/dto/region/region-list-element-dto';
import { HttpRestServiceACI } from 'src/app/shared/service/http-rest/http-rest.service.aci';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegionRestService {

  private apiURL = `${environment.restApiUrl}/region`;

  constructor(
    private httpRestService: HttpRestServiceACI<RegionListElementDTO>
  ) {}

  /**
   * List of all regions
   */
  public findAll(): Observable<Array<RegionListElementDTO>> {
    return this.httpRestService.findAll(`${this.apiURL}/findAll`);
  }
}
