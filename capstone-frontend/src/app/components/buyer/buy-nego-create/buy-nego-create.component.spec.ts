import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyNegoCreateComponent } from './buy-nego-create.component';

describe('BuyNegoCreateComponent', () => {
  let component: BuyNegoCreateComponent;
  let fixture: ComponentFixture<BuyNegoCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyNegoCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyNegoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
