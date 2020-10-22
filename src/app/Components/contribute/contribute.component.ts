import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { ArticleModel } from 'src/app/Utils/models';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.css']
})
export class ContributeComponent implements OnInit {

  article: ArticleModel = new ArticleModel();

  constructor(private http: HttpService) { }

  ngOnInit(): void {
  }

  onSubmitArticle() {
    console.log(this.article)
  }

}
