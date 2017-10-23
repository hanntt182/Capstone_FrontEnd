import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupPostCreate1Component } from './sup-post-create-1.component';

describe('SupPostCreate1Component', () => {
  let component: SupPostCreate1Component;
  let fixture: ComponentFixture<SupPostCreate1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupPostCreate1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupPostCreate1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
