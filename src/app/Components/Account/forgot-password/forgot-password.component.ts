import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';
import { ModalService } from 'src/app/Services/modal.service';
import { AccountMode } from '../account/account.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  userEmail: string;

  constructor(private modalService: ModalService, private accountService: AccountService) { }

  ngOnInit(): void {
  }

  closeAcountModal() {
    this.modalService.closeModal();
  }

  openLogin() {
    this.accountService.setAccountMode(AccountMode.Login);
  }

}
