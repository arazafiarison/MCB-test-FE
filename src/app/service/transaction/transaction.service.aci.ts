import { Observable } from "rxjs";
import { PaginationDTO } from "src/app/model/dto/pagination/pagination-dto";
import { TransactionDTO } from "src/app/model/dto/transaction/transaction-dto";

export abstract class TransactionServiceACI {
    public abstract findCustomerFromJson(customerName: string, customerNumber: string): any;
    public abstract save(transaction: TransactionDTO): Observable<TransactionDTO>;
    public abstract findAll(): Observable<Array<TransactionDTO>>;
    public abstract findByReferenceLike(reference: string): Observable<Array<TransactionDTO>>;
}