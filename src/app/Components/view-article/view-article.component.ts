import { Component, OnInit } from '@angular/core';
import { CommentModel } from 'src/app/Utils/models';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.css']
})
export class ViewArticleComponent implements OnInit {

  userComment: CommentModel = new CommentModel();

  constructor() { }

  ngOnInit(): void {
  }

}
