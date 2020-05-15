import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMonetizationComponent } from './ngx-monetization.component';

describe('NgxMonetizationComponent', () => {
  let component: NgxMonetizationComponent;
  let fixture: ComponentFixture<NgxMonetizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxMonetizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMonetizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
