import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffPostListComponent } from './staff-post-list.component';

describe('StaffPostListComponent', () => {
  let component: StaffPostListComponent;
  let fixture: ComponentFixture<StaffPostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffPostListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
