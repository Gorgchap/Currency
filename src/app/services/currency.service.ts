import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {getArray, xmlToJson} from '../common/helpers';
import {CurrencyType} from '../domain/currency';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  constructor(private http: HttpClient) { }

  public getXmlCurrency(url: string): Observable<CurrencyType[]> {
    return this.http.get(url, {responseType: 'text'})
      .pipe(map(res => xmlToJson(res)), catchError(err => { throw err; }));
  }

  public getJsonCurrency(url: string): Observable<CurrencyType[]> {
    return this.http.get(url)
      .pipe(map(res => getArray(res), catchError(err => { throw err; })));
  }
}
