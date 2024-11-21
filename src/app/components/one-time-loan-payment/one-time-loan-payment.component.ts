import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountTypes } from '../../enums/accountTypes';
import { Subject, takeUntil } from 'rxjs';
import { ILoanPayment } from 'src/app/interface/loan-payment';

function removeNullValues<T extends Record<string, any>>(obj: T): ILoanPayment {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== null)
  ) as ILoanPayment;
}

@Component({
  selector: 'app-one-time-loan-payment',
  templateUrl: './one-time-loan-payment.component.html',
  styleUrls: ['./one-time-loan-payment.component.scss']
})
export class OneTimeLoanPaymentComponent {
  @Input() defaultTypeOfAccount: AccountTypes = AccountTypes.Checking;
  formGroup: FormGroup;

  @Output() onSubmit: EventEmitter<ILoanPayment> = new EventEmitter<ILoanPayment>();

  $unsubscribe: Subject<void> = new Subject<void>();

  minDate = new Date();


  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      loanAccountNumber: [null, [Validators.required]],
      typeOfAccount: ['checking', Validators.required],
      cardNumber: [null],
      nameOnCard: [null],
      cvv: [null],
      expirationDate: [null],
      accountNumber: [null, [Validators.required]],
      confirmAccountNumber: [null, [Validators.required]],
      routingNumber: [null, [Validators.required, Validators.pattern(/^\d{9}$/)]],
    });
  }

  ngOnInit() {
    this.formGroup.get('typeOfAccount')!.valueChanges.pipe(
      takeUntil(this.$unsubscribe),
    ).subscribe((value) => {
      if (value === 'debit') {
        this.formGroup.get('cardNumber')!.setValidators([Validators.required]);
        this.formGroup.get('nameOnCard')!.setValidators([Validators.required]);
        this.formGroup.get('cvv')!.setValidators([Validators.required, Validators.pattern(/^\d{3}$/)]);
        this.formGroup.get('expirationDate')!.setValidators([Validators.required]);
        this.formGroup.get('accountNumber')!.clearValidators();
        this.formGroup.get('confirmAccountNumber')!.clearValidators();
        this.formGroup.get('routingNumber')!.clearValidators();
        this.formGroup.get('accountNumber')!.setValue(null);
        this.formGroup.get('confirmAccountNumber')!.setValue(null);
        this.formGroup.get('routingNumber')!.setValue(null);
      } else {
        this.formGroup.get('cardNumber')!.clearValidators();
        this.formGroup.get('nameOnCard')!.clearValidators();
        this.formGroup.get('cvv')!.clearValidators();
        this.formGroup.get('expirationDate')!.clearValidators();
        this.formGroup.get('cardNumber')!.setValue(null);
        this.formGroup.get('nameOnCard')!.setValue(null);
        this.formGroup.get('cvv')!.setValue(null);
        this.formGroup.get('expirationDate')!.setValue(null);
        this.formGroup.get('accountNumber')!.setValidators([Validators.required]);
        this.formGroup.get('confirmAccountNumber')!.setValidators([Validators.required]);
        this.formGroup.get('routingNumber')!.setValidators([Validators.required, Validators.pattern(/^\d{9}$/)]);
      }
      this.formGroup.get('cardNumber')!.updateValueAndValidity();
      this.formGroup.get('nameOnCard')!.updateValueAndValidity();
      this.formGroup.get('cvv')!.updateValueAndValidity();
      this.formGroup.get('expirationDate')!.updateValueAndValidity();
      this.formGroup.get('accountNumber')!.updateValueAndValidity();
      this.formGroup.get('confirmAccountNumber')!.updateValueAndValidity();
      this.formGroup.get('routingNumber')!.updateValueAndValidity();
    });
    if (this.defaultTypeOfAccount !== AccountTypes.Checking) {
      this.formGroup.get('typeOfAccount')!.setValue('debit');
    }
  }

  formSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      return;
    }
    const payload = removeNullValues(this.formGroup.value);
    this.onSubmit.emit(payload);
    this.formGroup.reset({
      typeOfAccount: this.defaultTypeOfAccount,
    });
  }

  ngOnDestory() {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }
}
