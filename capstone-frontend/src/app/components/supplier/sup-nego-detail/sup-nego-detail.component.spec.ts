import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupNegoDetailComponent } from './sup-nego-detail.component';

describe('SupNegoDetailComponent', () => {
  let component: SupNegoDetailComponent;
  let fixture: ComponentFixture<SupNegoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupNegoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupNegoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
