import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyProfileUpdateComponent } from './buy-profile-update.component';

describe('BuyProfileUpdateComponent', () => {
  let component: BuyProfileUpdateComponent;
  let fixture: ComponentFixture<BuyProfileUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyProfileUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyProfileUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
