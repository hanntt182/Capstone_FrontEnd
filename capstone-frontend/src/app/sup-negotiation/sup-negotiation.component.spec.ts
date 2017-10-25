import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupNegotiationComponent } from './sup-negotiation.component';

describe('SupNegotiationComponent', () => {
  let component: SupNegotiationComponent;
  let fixture: ComponentFixture<SupNegotiationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupNegotiationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupNegotiationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
