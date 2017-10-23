import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupHeaderComponent } from './sup-header.component';

describe('SupHeaderComponent', () => {
  let component: SupHeaderComponent;
  let fixture: ComponentFixture<SupHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
