import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';
import { ModalService } from 'src/app/Services/modal.service';
import { LoginRequest } from 'src/app/Utils/models';
import { AccountMode } from '../account/account.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: LoginRequest = new LoginRequest();

  constructor(private modalService: ModalService, private accountService: AccountService) { }

  ngOnInit(): void {
  }

  closeAcountModal() {
    this.modalService.closeModal();
  }

  openSignup() {
    this.accountService.setAccountMode(AccountMode.Signup);
  }

  openForgotPassword() {
    this.accountService.setAccountMode(AccountMode.ForgotPassword);
  }

}
