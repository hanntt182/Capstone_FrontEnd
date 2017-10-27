import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupOrderDetailComponent } from './sup-order-detail.component';

describe('SupOrderDetailComponent', () => {
  let component: SupOrderDetailComponent;
  let fixture: ComponentFixture<SupOrderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupOrderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
