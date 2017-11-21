import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupDealCreateComponent } from './sup-deal-create.component';

describe('SupDealCreateComponent', () => {
  let component: SupDealCreateComponent;
  let fixture: ComponentFixture<SupDealCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupDealCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupDealCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
