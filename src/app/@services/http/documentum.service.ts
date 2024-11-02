import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentumService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getPhotoCandidate(url: string) {
    url = url.replace(/^\//g, '');
    url = `${environment.apiUrl}/${url}`;
    return this.http.get<Blob>(url, {responseType: 'blob' as 'json'}).pipe(
      map((response: Blob) => {
        const reader = new FileReader;
        reader.readAsDataURL(response);
        return reader;
      })
    );
  }

}
