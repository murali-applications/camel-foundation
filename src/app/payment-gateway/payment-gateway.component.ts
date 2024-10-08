import { Component, inject, signal, ViewChild } from '@angular/core';
import { NgxStripeModule } from 'ngx-stripe';
import {
  injectStripe,
  StripeElementsDirective,
  StripePaymentElementComponent
} from 'ngx-stripe';
import { FormBuilder, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import {
  StripeElementsOptions,
  StripePaymentElementOptions
} from '@stripe/stripe-js';
import { PlutoService, STRIPE_PUBLIC_KEY } from './pluto.service';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';


@Component({
  selector: 'app-payment-gateway',
  standalone: true,
  imports: [
    NgxStripeModule,
    ReactiveFormsModule,
    StripeElementsDirective,
    StripePaymentElementComponent,
    SharedModule
  ],
  templateUrl: './payment-gateway.component.html',
  styleUrl: './payment-gateway.component.css'
})
export class PaymentGatewayComponent {
  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;

  private readonly fb = inject(FormBuilder);
  private readonly plutoService = inject(PlutoService);
  readonly stripe = injectStripe(STRIPE_PUBLIC_KEY);

  priceItem = [
    { value: 25, name: "£ 25" },
    { value: 50, name: "£ 50" },
    { value: 100, name: "£ 100" },
    { value: 0, name: "Other" }
  ];

  activeIndex: number = 0; // Index of the active item

  setActive(index: number): void {
    this.activeIndex = index;
    if (this.priceItem.length - 1 === index) {
      this.customPrice = true;
    } else {
      this.customPrice = false;
    }
  }

  customPrice: boolean = false;

  donation: any = [
    { value: 'Zakaath', name: "Zakaath" },
    { value: 'Non-Zakaath', name: "Non Zakaath ( Sadaqah / Lillah )" },
  ];

  causeList: any = [
    { value: '1', name: "To CFT" },
    { value: '2', name: "Institution" },
    { value: '3', name: "Sponsor" },
  ];

  checkoutForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    Cause: [this.causeList[0], [Validators.required]],
    donationType: [this.donation[0], [Validators.required]],
    recurringPayemnt: [true, [Validators.required]],
    address: ['',],
    zipcode: ['',],
    city: ['',],
    price: [25],
    amount: [1000, [Validators.required, Validators.pattern(/\d+/)]],
  });

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
    appearance: {
      theme: 'stripe',
      labels: 'floating',
      variables: {
        colorPrimary: '#673ab7',
      },
    },
  };

  paying = signal(false);


  ngOnInit() {


  }

  loadPaymentForm() {
    if (this.checkoutForm.invalid) {
      return;
    }
    const amount = this.checkoutForm.get('amount')?.value;

    this.plutoService
      .createPaymentIntent({
        amount,
        currency: 'eur',
      })
      .subscribe((pi) => {
        this.elementsOptions.clientSecret = pi.client_secret as string;
      });
  }

  get name() {
    return this.checkoutForm.get('name');
  }

  get email() {
    return this.checkoutForm.get('email');
  }

  get amount() {
    return this.checkoutForm.get('amount');
  }

  get Cause() {
    return this.checkoutForm.get('Cause');
  }

  get donationType() {
    return this.checkoutForm.get('donationType');
  }

  get mobileNumber() {
    return this.checkoutForm.get('mobileNumber');
  }



  clear() {
    this.checkoutForm.reset();
  }

  collectPayment() {
    if (this.paying() || this.checkoutForm.invalid) return;
    this.paying.set(true);

    const { name, email, address, zipcode, city } =
      this.checkoutForm.getRawValue();

    this.stripe
      .confirmPayment({
        elements: this.paymentElement.elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: name as string,
              email: email as string,
              address: {
                line1: address as string,
                postal_code: zipcode as string,
                city: city as string,
              },
            },
          },
        },
        redirect: 'if_required',
      })
      .subscribe({
        next: (result) => {
          this.paying.set(false);
          if (result.error) {
            console.log('Result Error....')
          } else if (result.paymentIntent.status === 'succeeded') {
            console.log('success....')
          }
        },
        error: (err) => {
          this.paying.set(false);
          console.log('Error....')
        },
      });
  }
}
