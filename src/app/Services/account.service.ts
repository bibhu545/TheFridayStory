import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  accountMode: Subject<number> = new Subject<number>();
  accountMode$ = this.accountMode.asObservable();

  constructor() { }

  setAccountMode(value: number) {
    this.accountMode.next(value);
  }

}
