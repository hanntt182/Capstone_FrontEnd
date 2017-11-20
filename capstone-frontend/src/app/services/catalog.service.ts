import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';


@Injectable()
export class CatalogService {


  constructor(private _http: Http) {
  }

  getCatalogs(apiUrl): Observable<any[]> {
    return this._http.get(apiUrl).map((response: Response) => response.json());
  }

  getListBrandByCatalog(apiUrl, data): Observable<any> {
    return this._http.post(apiUrl, data).map((response: Response) => response.json());
  }

}
