import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';
import { ModalService } from 'src/app/Services/modal.service';
import { SignupRequest } from 'src/app/Utils/models';
import { AccountMode } from '../account/account.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: SignupRequest = new SignupRequest();

  constructor(private modalService: ModalService, private accountService: AccountService) { }

  ngOnInit(): void {
  }

  closeAcountModal() {
    this.modalService.closeModal();
  }

  openLogin(){
    this.accountService.setAccountMode(AccountMode.Login);
  }

}
