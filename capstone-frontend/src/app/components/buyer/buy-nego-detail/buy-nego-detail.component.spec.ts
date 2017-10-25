import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyNegoDetailComponent } from './buy-nego-detail.component';

describe('BuyNegoDetailComponent', () => {
  let component: BuyNegoDetailComponent;
  let fixture: ComponentFixture<BuyNegoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyNegoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyNegoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
