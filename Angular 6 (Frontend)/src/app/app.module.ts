import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes, AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultLayoutComponent } from './layouts/default/default.component';
import { ExtraLayoutComponent } from './layouts/extra/extra.component';
import { MatTableModule } from '@angular/material/table';
import { UIModule } from './layouts/ui.module';
import { PagesModule } from './domain/pages.module';
import { signInservice } from './domain/services/signIn/signIn.service';
import { DashboardService } from './domain/services/dashboard/dashboard.service';
import { UrlParamService } from './domain/services/sharedservices/url-params-service';
import { ToastrModule } from 'ngx-toastr';
import { TostService } from './domain/services/sharedservices/tost.service';

@NgModule({

  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    ExtraLayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      autoDismiss: true,
      newestOnTop: true,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    RouterModule.forRoot(routes, { useHash: false }),

    AppRoutingModule,
    UIModule,
    PagesModule
  ],
  providers: [signInservice, DashboardService, UrlParamService, TostService],
  bootstrap: [AppComponent]
})

export class AppModule { }
