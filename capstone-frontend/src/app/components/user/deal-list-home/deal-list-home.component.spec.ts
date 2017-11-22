import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealListHomeComponent } from './deal-list-home.component';

describe('DealListHomeComponent', () => {
  let component: DealListHomeComponent;
  let fixture: ComponentFixture<DealListHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealListHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealListHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
