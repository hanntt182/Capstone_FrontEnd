import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffPostDetailComponent } from './staff-post-detail.component';

describe('StaffPostDetailComponent', () => {
  let component: StaffPostDetailComponent;
  let fixture: ComponentFixture<StaffPostDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffPostDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffPostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
