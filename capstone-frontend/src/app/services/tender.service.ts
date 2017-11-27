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


  searchTenderSupplier(apiUrl, data): Observable<any> {
    return this._http.post(apiUrl, data).map((response: Response) => response.json());
  }



  searchTender(apiUrl, data): Observable<any> {
    return this._http.post(apiUrl, data).map((response: Response) => response.json());
  }






  /*new*/
  getListPaymentMode(apiUrl): Observable<any> {
    return this._http.get(apiUrl).map((response: Response) => response.json());
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

  checkBid(apiUrl, data): Observable<any> {
    return this._http.post(apiUrl, data).map((response: Response) => response.text());
  }

  bidTender(apiUrl, data): Observable<any> {
    return this._http.post(apiUrl, data).map((response: Response) => response.text());
  }

  viewTenderHistoryDetail(apiUrl, data): Observable<any> {
    return this._http.post(apiUrl, data).map((response: Response) => response.json());
  }

  get5NewTender(apiUrl): Observable<any> {
    return this._http.get(apiUrl).map((response: Response) => response.json());
  }

  chooseBidder(apiUrl, data): Observable<any> {
    return this._http.post(apiUrl, data).map((response: Response) => response.json());
  }

  rateBuyerTender(apiUrl, data): Observable<any> {
    return this._http.post(apiUrl, data).map((response: Response) => response.text());
  }

  rateSupplierTender(apiUrl, data): Observable<any> {
    return this._http.post(apiUrl, data).map((response: Response) => response.text());
  }

  cancleTender(apiUrl, data): Observable<any> {
    return this._http.post(apiUrl, data).map((response: Response) => response.text());
  }

  getListSupplierJoinTender(apiUrl, data): Observable<any> {
    return this._http.post(apiUrl, data).map((response: Response) => response.json());
  }

  withdrawTender(apiUrl, data): Observable<any> {
    return this._http.post(apiUrl, data).map((response: Response) => response.text());
  }
}
