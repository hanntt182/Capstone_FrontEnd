import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyTenderListComponent } from './buy-tender-list.component';

describe('BuyTenderListComponent', () => {
  let component: BuyTenderListComponent;
  let fixture: ComponentFixture<BuyTenderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyTenderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyTenderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
