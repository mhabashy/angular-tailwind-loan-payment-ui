import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneTimeLoanPaymentComponent } from './one-time-loan-payment.component';

describe('OneTimeLoanPaymentComponent', () => {
  let component: OneTimeLoanPaymentComponent;
  let fixture: ComponentFixture<OneTimeLoanPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OneTimeLoanPaymentComponent]
    });
    fixture = TestBed.createComponent(OneTimeLoanPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
