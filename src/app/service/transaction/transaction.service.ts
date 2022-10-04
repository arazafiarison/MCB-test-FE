import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionRestServiceACI } from 'src/app/controller/transaction/transaction-rest.service.aci';
import { PaginationDTO } from 'src/app/model/dto/pagination/pagination-dto';
import { TransactionDTO } from 'src/app/model/dto/transaction/transaction-dto';
import TransactionData from 'src/assets/json data/customer.json';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private transactionRestService: TransactionRestServiceACI
  ) { }

  public findCustomerFromJson(customerName: string, customerNumber: string): any {
    const customerList = TransactionData.responseXML.getCustomerInfoResponse.getCustomerInfoResult;
    if (customerList['CUST_INFO']['CUST_NO'] === customerNumber && customerList['CUST_INFO']['SHORT_NAME'] === customerName) {
      return customerList['CUST_INFO'];
    }
    return null;
  }

  public save(transaction: TransactionDTO): Observable<TransactionDTO> {
    return this.transactionRestService.save(transaction);
  }

  public findAll(): Observable<Array<TransactionDTO>> {
    return this.transactionRestService.findAll();
  }

  public findByReferenceLike(reference: string): Observable<Array<TransactionDTO>> {
    return this.transactionRestService.findByReferenceLike(reference);
  }
}
