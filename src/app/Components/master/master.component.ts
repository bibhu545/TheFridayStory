import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';
import { ModalService } from 'src/app/Services/modal.service';
import { AccountComponent, AccountMode } from '../Account/account/account.component';
import { LoginComponent } from '../Account/login/login.component';
import { SignupComponent } from '../Account/signup/signup.component';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  openAccount() {
    this.modalService.openModal(AccountComponent);
  }

}
