import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TwitterSkApiService {
  constructor(protected http: HttpClient) {}

  getFrequentlySearchResult(sw): Observable<any> {
    return this.http.get(`${environment.backendUrl}/frequently-used-words?sw=${sw}`);
  }
  login(data): Observable<any> {
    return this.http.post(`${environment.backendUrl}/login`, data);
  }
  register(data): Observable<any> {
    return this.http.get(`${environment.backendUrl}/register`, data);
  }
  addTwitterSearchToDb(sw) {
    return this.http.get(
      `${environment.backendUrl}/api/twitter-search-post?sw=${sw}`
    );
  }
  twitterSentimetAnalys() {
    return this.http.get(`${environment.backendUrl}/api/twitter-search`);
  }
}
