import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupPostListComponent } from './sup-post-list.component';

describe('SupPostListComponent', () => {
  let component: SupPostListComponent;
  let fixture: ComponentFixture<SupPostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupPostListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
