import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderListHomeComponent } from './tender-list-home.component';

describe('TenderListHomeComponent', () => {
  let component: TenderListHomeComponent;
  let fixture: ComponentFixture<TenderListHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderListHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderListHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
