import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/Services/http.service';
import { ArticleModel, dropDownmodel } from 'src/app/Utils/models';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.css']
})
export class ContributeComponent implements OnInit {

  article: ArticleModel = new ArticleModel();
  storyFormData: any = {};
  tags: dropDownmodel[] = [];
  categories: dropDownmodel[] = [];

  constructor(private http: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.getCommonData();
  }

  getCommonData() {
    this.http.getData('/api/getHomePageCommonData').subscribe(response => {
      this.tags = response.tags;
      this.categories = response.categories;
    }, error => {
      alert(error.message);
    })
  }

  uploadFeaturedImage(event) {
    this.storyFormData = {
      ...this.storyFormData,
      "articleImage": event.target.files[0]
    }
  }

  createStory() {
    this.storyFormData = {
      ...this.storyFormData,
      ...this.article
    }
    this.storyFormData.user = "5f9073e57592802e1c6827f1";
    let formData = new FormData();
    for (const key of Object.keys(this.storyFormData)) {
      const value = this.storyFormData[key];
      formData.append(key, value);
    }

    this.http.postData('/api/article', formData).subscribe(response => {
      if (response.data) {
        this.router.navigateByUrl(`/${response._id}`)
      }
    }, error => {
      alert(error.message);
    });

  }
}