import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';


@Injectable()
export class OrderService {


  constructor(private _http: Http) {
  }

  getListCity(apiUrl): Observable<any> {
    return this._http.get(apiUrl).map((response: Response) => response.json());
  }

  getListDistrict(apiUrl, data): Observable<any> {
    return this._http.post(apiUrl, data).map((response: Response) => response.json());
  }

  getListWard(apiUrl, data): Observable<any> {
    return this._http.post(apiUrl, data).map((response: Response) => response.json());
  }

  createOrder(apiUrl, data): Observable<any> {
    return this._http.post(apiUrl, data).map((response: Response) => response.text());
  }

  searchOrderSupplier(apiUrl, data): Observable<any> {
    return this._http.post(apiUrl, data).map((response: Response) => response.json());
  }

  searchOrderBuyer(apiUrl, data): Observable<any> {
    return this._http.post(apiUrl, data).map((response: Response) => response.json());
  }

  searchOrder(apiUrl, data): Observable<any> {
    return this._http.post(apiUrl, data).map((response: Response) => response.json());
  }

  confirmOrder(apiUrl, data): Observable<any> {
    return this._http.post(apiUrl, data).map((response: Response) => response.text());
  }

  viewOrderDetail(apiUrl, data): Observable<any> {
    return this._http.post(apiUrl, data).map((response: Response) => response.json());
  }

  paymentBuyer(apiUrl, data): Observable<any> {
    return this._http.post(apiUrl, data).map((response: Response) => response.text());
  }

  confirmShipping(apiUrl, data): Observable<any> {
    return this._http.post(apiUrl, data).map((response: Response) => response.text());
  }

  cancleOrder(apiUrl, data): Observable<any> {
    return this._http.post(apiUrl, data).map((response: Response) => response.text());
  }
}
