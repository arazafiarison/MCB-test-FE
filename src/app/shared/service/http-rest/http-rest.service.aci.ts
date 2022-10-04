import { Observable } from "rxjs";
import { PaginationDTO } from "src/app/model/dto/pagination/pagination-dto";
import { HttpMethodEnum } from "./http-rest.service";

export abstract class HttpRestServiceACI<T> {
    public abstract customAPICall<U>(method: HttpMethodEnum, url: string, data?: any): Observable<U>;
    public abstract findAll(url: string): Observable<Array<T>>;
    public abstract findAllWithPagination(url: string, pagination: PaginationDTO): Observable<Array<T>>;
    public abstract save(url: string, newObjectToSave: T): Observable<T>;
    public abstract findByField(url: string, fieldName: string, fieldValue: any): Observable<Array<T>>;
}