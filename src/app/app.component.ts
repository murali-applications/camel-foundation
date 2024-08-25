import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PaymentGatewayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'camel-foundation-app';
}
