import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { map, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { map as lodashMap } from 'lodash';
import { Observable } from 'rxjs';


@Injectable()
export class AddressesService {
  config: any;
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.config = {
      apiUrl: 'http://127.0.0.1:9080/assets'
    };
    this.headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    );
  }

  /**
   *
   * @param type string
   * @param where any
   * @param prepend any
   */
  get_administrative_division(type: string, where?: any, prepend?: boolean): Observable<{}> {
    const data = where ? where : {};
    return this.http.post(`${this.config.apiUrl}/${type}`, data, {
      headers: this.headers
    }).pipe(
      retry(1),
      map(address => {
        let formatted = lodashMap(address, item => ({ value: item[0], name: item[1] }));
        formatted = prepend ? [{value: '', name: ''}].concat(formatted) : formatted;
        return formatted;
      })
    );
  }
}
