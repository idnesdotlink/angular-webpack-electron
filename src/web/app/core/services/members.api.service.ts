import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {throwError, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {transform} from 'lodash';
import {Injectable} from '@angular/core';

@Injectable()
export class MembersService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://127.0.0.1:9080/assets';
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  get_all(data?: any): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
  });
    return this.http.get(`${this.apiUrl}/member.json`, {headers})
    .pipe(
      map((response: any) => {
        /* let { meta, list } = response;
        let { column, size } = meta;
        list = transform(list, (acc, items: any[]) => {
          let item = {}
          for(let index = 0; index < items.length; index++ ) {
            item[column[index]] = items[index]
          }
          acc.push(item)
        }, []); */
        console.log(response);
        return { size: 1, list: [], column: [] };
        // return { size, list, column }
      }),
      catchError(this.handleError)
    );
  }

  get_one(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/members/${id}`, {}, {})
    .pipe(
      catchError(this.handleError)
    );
  }

}
