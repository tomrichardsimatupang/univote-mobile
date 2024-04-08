import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpCoreService {

  buildQuery(query: any): HttpParams {
    let queryParams = new HttpParams();
    Object.keys(query).forEach((key: any) => {
      if(key === '__metadata') {
        queryParams = queryParams.append(key,JSON.stringify(query[key]));
      }else {
        queryParams = queryParams.append(key,query[key]);
      }
    });
    return queryParams;
  }

  buildUrl(url: string, params: any): string {
    Object.keys(params).forEach((key: string) => {
      url = url.replace(`:${key}`, params[key]);
    });
    return url;
  }

}
