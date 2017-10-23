import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupPostCreate3Component } from './sup-post-create-3.component';

describe('SupPostCreate3Component', () => {
  let component: SupPostCreate3Component;
  let fixture: ComponentFixture<SupPostCreate3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupPostCreate3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupPostCreate3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
