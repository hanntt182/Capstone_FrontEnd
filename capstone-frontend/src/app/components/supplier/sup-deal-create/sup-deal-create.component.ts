import {Component, OnInit} from '@angular/core';
import {Constants} from './../../../constants';
import {CatalogService} from "../../../services/catalog.service";

@Component({
  selector: 'app-sup-deal-create',
  templateUrl: './sup-deal-create.component.html',
  styleUrls: ['./sup-deal-create.component.css']
})
export class SupDealCreateComponent implements OnInit {

  public user;
  public catagories;
  public imageData;
  public imageLink;
  public imageType;

  constructor(private constants: Constants,
              private catalogService: CatalogService) {
  }

  ngOnInit() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }

    this.catalogService.getCatalogs(this.constants.GETLISTCATALOG).subscribe((response: any) => {
      this.catagories = response;
    }, error => {
      console.log(error);
    });
  }

  onChangeImage(e) {
    this.imageType = true;
    if (e.target.files[0].type != 'image/jpeg' &&
      e.target.files[0].type != 'image/png') {
      this.imageType = false;
      return;
    } else {
      this.imageData = e.target.files[0];
      let reader = new FileReader();
      reader.onload = (_event: any) => {
        this.imageLink = _event.target.result;
      };
      reader.readAsDataURL(this.imageData);
    }
    console.log(e);
  }

}
