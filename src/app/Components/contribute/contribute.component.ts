import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { ArticleModel, dropDownmodel } from 'src/app/Utils/models';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.css']
})
export class ContributeComponent implements OnInit {

  article: ArticleModel = new ArticleModel();
  tags: dropDownmodel[] = [];
  categories: dropDownmodel[] = [];

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.getCommonData();
  }

  getCommonData() {
    this.http.getData('/api/getHomePageCommonData').subscribe(response => {
      this.tags = response.tags;
      this.categories = response.categories;
      console.table(this.tags)
      console.table(this.categories)
    }, error => {
      alert(error.message);
    })
  }

  onSubmitArticle() {
    console.log(this.article)
  }

}
