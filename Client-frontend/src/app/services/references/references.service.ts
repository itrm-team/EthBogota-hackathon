import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReferenceService implements OnInit {
  private url = environment.externalUrl;

  constructor(private http: HttpClient, private auth: AuthService) {}
  async ngOnInit() {
    this.test();
  }

  createReference(currentUser: string): Observable<any> {
    return this.http.post(
      `${this.url}/api/createReference`,
      {
        currentUser: currentUser,
      },
      { responseType: 'text' }
    );
  }

  verifyReference(reference: object):Observable<any> {
    return this.http.post(
      `${this.url}/api/verifyReference`,
      {
        reference: reference,
        
      },
      { responseType: 'text' }
    );
  }

  async test() {
    return await this.http.get<any>(`${this.url}/api/testWompi`);
  }
}
