import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupMainComponent } from './sup-main.component';

describe('SupMainComponent', () => {
  let component: SupMainComponent;
  let fixture: ComponentFixture<SupMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
