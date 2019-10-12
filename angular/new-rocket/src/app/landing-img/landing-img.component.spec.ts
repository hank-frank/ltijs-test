import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingImgComponent } from './landing-img.component';

describe('LandingImgComponent', () => {
  let component: LandingImgComponent;
  let fixture: ComponentFixture<LandingImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
