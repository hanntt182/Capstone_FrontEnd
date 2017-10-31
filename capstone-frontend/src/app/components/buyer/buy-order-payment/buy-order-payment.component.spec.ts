import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyOrderPaymentComponent } from './buy-order-payment.component';

describe('BuyOrderPaymentComponent', () => {
  let component: BuyOrderPaymentComponent;
  let fixture: ComponentFixture<BuyOrderPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyOrderPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyOrderPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
