import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyDealOrderComponent } from './buy-deal-order.component';

describe('BuyDealOrderComponent', () => {
  let component: BuyDealOrderComponent;
  let fixture: ComponentFixture<BuyDealOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyDealOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyDealOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
