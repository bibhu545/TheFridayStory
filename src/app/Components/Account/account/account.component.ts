import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  accountMode: number = 0;

  constructor(private accountService: AccountService) {

  }

  ngOnInit(): void {
    this.accountService.accountMode$.subscribe(data => {
      this.accountMode = data;
    })
  }

}

export enum AccountMode {
  Login,
  Signup,
  ChangePassword,
  ForgotPassword
}
