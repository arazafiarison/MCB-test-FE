import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationDTO } from 'src/app/model/dto/pagination/pagination-dto';
import { HttpRestServiceACI } from './http-rest.service.aci';

/**
 * Generic service rest API calls
 */
@Injectable({
  providedIn: 'root'
})
export class HttpRestService<T> implements HttpRestServiceACI<T> {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Custom call
   * @param method GET, POST, PUT, PATCH, DELETE
   * @param url 
   * @param data query body (optional)
   * @returns 
   */
  public customAPICall<U>(method: HttpMethodEnum, url: string, data?: any): Observable<U> {
    switch (method) {
      case HttpMethodEnum.GET : {
        return this.http.get<U>(url);
      }
      case HttpMethodEnum.POST : {
        console.log('post')
        return this.http.post<U>(url, data);
      }
      case HttpMethodEnum.PUT : {
        return this.http.put<U>(url, data);
      }
      case HttpMethodEnum.PATCH : {
        return this.http.patch<U>(url, data);
      }
      case HttpMethodEnum.DELETE : {
        return this.http.delete<U>(url);
      }
    }
  }

  /**
   * Retrieve all list data
   * @param url API url
   * @returns 
   */
  public findAll(url: string): Observable<Array<T>> {
    return this.http.get<Array<T>>(url);
  }

  /**
   * Retrieve all list data with pagination
   * @param url API url
   * @returns 
   */
  public findAllWithPagination(url: string, pagination: PaginationDTO): Observable<Array<T>> {
    return this.http.post<Array<T>>(url, pagination);
  }

  /**
   * Save : create or update
   * @param url 
   * @param newObjectToSave 
   * @returns 
   */
  public save(url: string, newObjectToSave: T): Observable<T> {
    return this.http.post<T>(url, newObjectToSave);
  }

  /**
   * Find all record by field
   * @param url 
   * @param fieldName 
   * @param fieldValue 
   * @returns 
   */
  public findByField(url: string, fieldName: string, fieldValue: any): Observable<Array<T>> {
    const headers = new HttpHeaders().append('Content-Type', 'x-www-form-urlencoded; charset=utf-8');
    const params = new HttpParams().append(fieldName, fieldValue);
    return this.http.get<Array<T>>(url, { headers, params });
  }
}


export enum HttpMethodEnum {
  GET,POST,PUT, PATCH, DELETE
}