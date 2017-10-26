import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupPostUpdateComponent } from './sup-post-update.component';

describe('SupPostUpdateComponent', () => {
  let component: SupPostUpdateComponent;
  let fixture: ComponentFixture<SupPostUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupPostUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupPostUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
