import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcpCadreCentralPpComponent } from './ccp-cadre-central-pp.component';

describe('CcpCadreCentralPpComponent', () => {
  let component: CcpCadreCentralPpComponent;
  let fixture: ComponentFixture<CcpCadreCentralPpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcpCadreCentralPpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcpCadreCentralPpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
