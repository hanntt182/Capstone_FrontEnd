import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupOrderConfirmComponent } from './sup-order-confirm.component';

describe('SupOrderConfirmComponent', () => {
  let component: SupOrderConfirmComponent;
  let fixture: ComponentFixture<SupOrderConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupOrderConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupOrderConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
