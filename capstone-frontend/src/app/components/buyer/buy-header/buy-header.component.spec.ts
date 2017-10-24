import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyHeaderComponent } from './buy-header.component';

describe('BuyHeaderComponent', () => {
  let component: BuyHeaderComponent;
  let fixture: ComponentFixture<BuyHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
