import { Injectable, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  openModal(template: any, settings?: any) {
    let config = {
      backdrop: true,
      ignoreBackdropClick: true,
      ...settings
    };
    this.bsModalRef = this.modalService.show(template, config);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  closeModal() {
    this.bsModalRef.hide()
  }

}
