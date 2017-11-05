import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyNegoPaymentComponent } from './buy-nego-payment.component';

describe('BuyNegoPaymentComponent', () => {
  let component: BuyNegoPaymentComponent;
  let fixture: ComponentFixture<BuyNegoPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyNegoPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyNegoPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
