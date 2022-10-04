import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { CustomerDTO } from 'src/app/model/dto/customer/customer-dto';
import { RegionEmbededDTO } from 'src/app/model/dto/region/region-embeded-dto';
import { RegionListElementDTO } from 'src/app/model/dto/region/region-list-element-dto';
import { TransactionDTO } from 'src/app/model/dto/transaction/transaction-dto';
import { CurrencyEnum } from 'src/app/model/enumeration/currency/currency-enum';
import { RegionServiceACI } from 'src/app/service/region/region.service.aci';
import { TransactionServiceACI } from 'src/app/service/transaction/transaction.service.aci';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit, OnDestroy {

  currencyList = Object.values(CurrencyEnum);
  regionList: Array<RegionListElementDTO>;
  transactionForm: FormGroup;
  subscriptions = new Array<Subscription>();
  transaction: TransactionDTO;
  transactionReferenceList: Array<String>;

  constructor(
    private regionService: RegionServiceACI,
    private formBuilder: FormBuilder,
    private transactionService: TransactionServiceACI,
    private datePipe: DatePipe,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadRegions();
    this.initializeForm();
  }

  ngOnDestroy(): void {
    if (this.subscriptions?.length) {
      this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
    }
  }

  loadRegions(): void {
    this.regionService.findAll().pipe(take(1))
      .subscribe((regions: Array<RegionListElementDTO>) => {
        this.regionList = regions;
      });
  }

  initializeForm(): void {
    // Form fields initialization
    this.transactionForm = this.formBuilder.group({
      formActionType: new FormControl(true, Validators.required),
      reference: new FormControl(null, Validators.required),
      customerNumber: new FormControl(null, Validators.required),
      customerName: new FormControl(null, Validators.required),
      customerPhoneNumber: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      customerAddressLine1: new FormControl(null, Validators.required),
      customerAddressLine2: new FormControl(null, Validators.required),
      transferAmount: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      transferCurrency: new FormControl(null, Validators.required),
      beneficiaryBank: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]),
      beneficiaryAccountNumber: new FormControl(null, Validators.required),
      paymentDetails: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]),
      cardDetails: new FormControl(null, Validators.required),
      region: new FormControl(null, Validators.required)  
    });
    
    // Populate when customer infos are written
    const customerNameSubscription = this.transactionForm.get('customerName')
      .valueChanges.subscribe((customerName: string) => {
        this.findCustomerData()
      });
    this.subscriptions.push(customerNameSubscription);
    const customerNumberSubscription = this.transactionForm.get('customerNumber')
      .valueChanges.subscribe((customerName: string) => {
        this.findCustomerData()
      });
    this.subscriptions.push(customerNumberSubscription);
    
    // New / existing data (radio button)
    this.updateReferenceControlByFormActionType(this.transactionForm.get('formActionType').value);
    const formActionTypeSubscription = this.transactionForm.get('formActionType')
      .valueChanges.subscribe((formActionType: boolean) => {
        this.updateReferenceControlByFormActionType(formActionType);
      });
    this.subscriptions.push(formActionTypeSubscription);

    // Search existing reference
    // Reference on change : Autofill the other fields with the transactionData
    const referenceSubscription = this.transactionForm.get('reference')
      .valueChanges.subscribe((reference: string) => {
        if (reference?.length && !this.transactionForm.get('formActionType').value) {
          this.searchTransactionByReference(reference);
        }
      });
    this.subscriptions.push(referenceSubscription);
  }

  searchTransactionByReference(reference: string): void {
    this.transactionService.findByReferenceLike(reference).pipe(take(1))
      .subscribe((transactionList: Array<TransactionDTO>) => {
        this.transactionReferenceList = transactionList.map((transaction: TransactionDTO) => {
          return transaction.reference
        });
        // Update form if matching
        const transactionTemp = transactionList.find((transaction: TransactionDTO) => transaction.reference === reference);
        if (transactionTemp) {
          this.transaction = transactionTemp;
          this.transactionForm.patchValue({
            customerNumber: transactionTemp.customer.number,
            customerName: transactionTemp.customer.name,
            customerPhoneNumber: transactionTemp.customer.phoneNumber,
            customerAddressLine1: transactionTemp.customer.addressLine1,
            customerAddressLine2: transactionTemp.customer.addressLine2,
            transferAmount: transactionTemp.transferAmount,
            transferCurrency: transactionTemp.transferCurrency,
            beneficiaryBank: transactionTemp.beneficiaryBank,
            beneficiaryAccountNumber: transactionTemp.beneficiaryAccountNumber,
            paymentDetails: transactionTemp.paymentDetails,
            cardDetails: transactionTemp.cardDetails,
            region: this.regionList.find((regionTemp: RegionListElementDTO) => transactionTemp.region.id === regionTemp.regionId)
          });
        }
      });
  }

  updateReferenceControlByFormActionType(formActionType): void {
    if (formActionType) {
      this.transactionForm.get('reference').disable();
      // Generate reference
      this.generateReference();
    } else {
      this.transactionForm.get('reference').enable();
      this.transactionForm.get('reference').setValue('');
    }
  }

  /**
   * Populate customer fields from .json file
   */
  findCustomerData(): void {
    const customerName = this.transactionForm.get('customerName').value;
    const customerNumber = this.transactionForm.get('customerNumber').value;

    const customerDetails = this.transactionService.findCustomerFromJson(customerName, customerNumber);
    if (customerDetails) {
      this.transactionForm.get('customerAddressLine1').setValue(customerDetails['ADDRESS_LINE2']);
      this.transactionForm.get('customerAddressLine2').setValue(customerDetails['ADDRESS_LINE3']);
      this.transactionForm.get('customerPhoneNumber').setValue(customerDetails['CONTACT_INFO_V7']['CONTACT_INFO_V7']['PHONE_LIST_V7']['PHONE_LIST_ITEM_V7']['PHONE']);
    }
  }

  generateReference(): void {
    const numbers = '0123456789';
    const numbersLength = numbers.length;
    let randomNumberSequence = '';
    for (let i = 0; i < 4; i++) {
        randomNumberSequence += numbers.charAt(Math.floor(Math.random() * numbersLength));
    }
    const reference = `CUS${this.datePipe.transform(new Date(), 'YYYYMMDD')}${randomNumberSequence}`;
    this.transactionForm.get('reference').setValue(reference);
  }

  saveTransation(): void {
    if (this.transactionForm.valid) {
      const regionListElement = this.transactionForm.get('region').value as RegionListElementDTO
      const region = {
        id: regionListElement.regionId,
        region: regionListElement.regionName
      } as RegionEmbededDTO;
      const customer = {
        number: this.transactionForm.get('customerNumber').value,
        name: this.transactionForm.get('customerName').value,
        addressLine1: this.transactionForm.get('customerAddressLine1').value,
        addressLine2: this.transactionForm.get('customerAddressLine2').value,
        phoneNumber: this.transactionForm.get('customerPhoneNumber').value
      } as CustomerDTO;
      this.transaction = {
        id: this.transaction?.id,
        reference: this.transactionForm.get('reference').value,
        customer,
        transferAmount: this.transactionForm.get('transferAmount').value,
        transferCurrency: this.transactionForm.get('transferCurrency').value,
        beneficiaryBank: this.transactionForm.get('beneficiaryBank').value,
        beneficiaryAccountNumber: this.transactionForm.get('beneficiaryAccountNumber').value,
        paymentDetails: this.transactionForm.get('paymentDetails').value,
        cardDetails: this.transactionForm.get('cardDetails').value,
        region,
        creationDate: this.transaction?.creationDate ?? new Date(),
      } as TransactionDTO;

      this.transactionService.save(this.transaction).pipe(take(1))
        .subscribe((transaction: TransactionDTO) => {
          if (transaction) {
            // Snackbar message transaction saved, redirect to list or reinitialize form
            this._snackBar.open('Transaction saved with success');
            this.transactionForm.reset();
          }
        });
    }
  }

  clearForm(): void {
    this.transactionForm.reset();
  }

}
