import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcpCadreCentralPPComponent } from './ccp-cadre-central-pp.component';

describe('CcpCadreCentralPPComponent', () => {
  let component: CcpCadreCentralPPComponent;
  let fixture: ComponentFixture<CcpCadreCentralPPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcpCadreCentralPPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcpCadreCentralPPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
