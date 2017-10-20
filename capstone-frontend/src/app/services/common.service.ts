import {Injectable} from '@angular/core';


@Injectable()
export class CommonService {


  constructor() {
  }

  showLoginForm() {
    document.getElementById('openModalButton').click();
  }

}
