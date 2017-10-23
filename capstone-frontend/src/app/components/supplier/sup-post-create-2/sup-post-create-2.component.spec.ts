import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupPostCreate2Component } from './sup-post-create-2.component';

describe('SupPostCreate2Component', () => {
  let component: SupPostCreate2Component;
  let fixture: ComponentFixture<SupPostCreate2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupPostCreate2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupPostCreate2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
