import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContributeComponent } from './Components/contribute/contribute.component';
import { HomeComponent } from './Components/home/home.component';
import { MasterComponent } from './Components/master/master.component';
import { ViewArticleComponent } from './Components/view-article/view-article.component';

const routes: Routes = [
  {
    path: '', component: MasterComponent, children: [
      { path: '', component: HomeComponent }
    ]
  },
  {
    path: 'contribute', component: MasterComponent, children: [
      { path: '', component: ContributeComponent }
    ]
  },
  {
    path: ':slug', component: MasterComponent, children: [
      { path: '', component: ViewArticleComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
