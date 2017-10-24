import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupOrderListComponent } from './sup-order-list.component';

describe('SupOrderListComponent', () => {
  let component: SupOrderListComponent;
  let fixture: ComponentFixture<SupOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
