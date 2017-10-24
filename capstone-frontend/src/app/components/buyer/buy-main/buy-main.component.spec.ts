import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyMainComponent } from './buy-main.component';

describe('BuyMainComponent', () => {
  let component: BuyMainComponent;
  let fixture: ComponentFixture<BuyMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
