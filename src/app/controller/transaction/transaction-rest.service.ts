import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationDTO } from 'src/app/model/dto/pagination/pagination-dto';
import { TransactionDTO } from 'src/app/model/dto/transaction/transaction-dto';
import { HttpRestServiceACI } from 'src/app/shared/service/http-rest/http-rest.service.aci';
import { environment } from 'src/environments/environment';
import { TransactionRestServiceACI } from './transaction-rest.service.aci';

@Injectable({
  providedIn: 'root'
})
export class TransactionRestService implements TransactionRestServiceACI {

  private apiURL = `${environment.restApiUrl}/transaction`;

  constructor(
    private httpRestService: HttpRestServiceACI<TransactionDTO>
  ) {}

  /**
   * Save transaction  create or update
   * @param transaction 
   * @returns 
   */
  public save(transaction: TransactionDTO): Observable<TransactionDTO> {
    return this.httpRestService.save(this.apiURL, transaction);
  }

  /**
   * Find all transactions (with pagination)
   * @param pagination 
   * @returns 
   */
  public findAll(): Observable<Array<TransactionDTO>> {
    return this.httpRestService.findAll(`${this.apiURL}/findAll`);
  }

  public findByReferenceLike(reference: string): Observable<Array<TransactionDTO>> {
    return this.httpRestService.findByField(`${this.apiURL}/findByReference`, 'reference', reference);
  }
}
