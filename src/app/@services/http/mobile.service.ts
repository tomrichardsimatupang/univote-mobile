import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpCoreService } from './http.core.service';
import { WsConstant } from './ws.constant';
import { environment } from '@environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MobileService extends HttpCoreService {

  constructor(
    private readonly http: HttpClient
  ) { super(); }

  getCandidateList() {
    return this.http.get( WsConstant.getCandidateList );
  }

  getCandidatePhoto(url: string): Observable<any> {
    url = `${environment.apiUrl}${url}`;
    return this.http.get<Blob>(url, {responseType: 'blob' as 'json'}).pipe(
      map((response: Blob) => {
        const reader = new FileReader;
        reader.readAsDataURL(response);
        return new Promise<any>((resolve, reject) => {
          reader.onload = () => {
            resolve(reader.result);
          }
        });
      })
    );;
  }

  postVoteCheckin( token: string ) {
    return this.http.post( WsConstant.postVoteCheckin, {token});
  }

  postVoteCandidateVoting( payload: any ) {
    return this.http.post( WsConstant.postVoteCandidateVoting, payload);
  }

  getProfilingDetail(skipPopup = false): Observable<any> {
    let headers = {};
    if(skipPopup) {
      headers = { 'x-error-general':'skip' }
    }
    return this.http.get( WsConstant.getProfilingDetail, {headers});
  }

  postProfilingUpdate( payload: any ): Observable<any> {
    return this.http.post( WsConstant.postProfilingUpdate, payload );
  }

  getContentPostList(): Observable<any> {
    return this.http.get( WsConstant.getContentPostList );
  }

  getVoteReportList(skipPopup = false): Observable<any> {
    let headers = {};
    if(skipPopup) {
      headers = { 'x-error-general':'skip' }
    }
    return this.http.get( WsConstant.getVoteReportList, {headers});
  }

  getVoteReporDetail( query: any ): Observable<any> {
    const url = `${WsConstant.getVoteReportDetail}?${this.buildQuery(query)}`;
    return this.http.get( url );
  }

}
