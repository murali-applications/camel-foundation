import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './core/default-layout/default-layout.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { CausesComponent } from './pages/causes/causes.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
export const routes: Routes = [
    {
        path: '', component: DefaultLayoutComponent, children: [
            { path: 'home', component: HomeComponent },
            { path: 'donate', component: PaymentGatewayComponent },
            { path: 'about-us', component: AboutUsComponent },
            { path: 'contact-us', component: ContactUsComponent },
            { path: 'our-causes', component: CausesComponent },
            { path: 'gallery', component: GalleryComponent },
            { path: '', redirectTo: 'home', pathMatch: 'full' }
        ]
    },
];
