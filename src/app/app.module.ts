import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { MasterComponent } from './Components/master/master.component';
import { FooterComponent } from './Components/footer/footer.component';
import { RightPanelComponent } from './Components/right-panel/right-panel.component';
import { FormsModule } from '@angular/forms';
import { AccountComponent } from './Components/Account/account/account.component';
import { LoginComponent } from './Components/Account/login/login.component';
import { SignupComponent } from './Components/Account/signup/signup.component';
import { ChangePasswordComponent } from './Components/Account/change-password/change-password.component';
import { ForgotPasswordComponent } from './Components/Account/forgot-password/forgot-password.component';
import { EditPostComponent } from './Components/edit-post/edit-post.component';
import { ViewPostComponent } from './Components/view-post/view-post.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    MasterComponent,
    FooterComponent,
    RightPanelComponent,
    AccountComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    EditPostComponent,
    ViewPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
