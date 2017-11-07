import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';


@Injectable()
export class TenderService {


  constructor(private _http: Http) {
  }

  searchProduct(apiUrl, data): Observable<any> {
    return this._http.post(apiUrl, data).map((response: Response) => response.json());
  }

  createTender(apiUrl, data): Observable<any> {
    return this._http.post(apiUrl, data).map((response: Response) => response.text());
  }

  searchTenderBuyer(apiUrl, data): Observable<any> {
    return this._http.post(apiUrl, data).map((response: Response) => response.json());
  }

  viewTenderDetail(apiUrl, data): Observable<any> {
    return this._http.post(apiUrl, data).map((response: Response) => response.json());
  }

  cancleTender(apiUrl, data): Observable<any> {
    return this._http.post(apiUrl, data).map((response: Response) => response.text());
  }
}
