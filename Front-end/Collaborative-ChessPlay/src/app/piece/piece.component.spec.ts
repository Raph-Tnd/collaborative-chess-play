import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiececomponentComponent } from './piece.component';

describe('PiececomponentComponent', () => {
  let component: PiececomponentComponent;
  let fixture: ComponentFixture<PiececomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiececomponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PiececomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
