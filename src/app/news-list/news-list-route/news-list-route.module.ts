import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NewsListComponent } from '../news-list/news-list.component';
import { NewsItemComponent } from '../news-item/news-item.component';
import { NewsDetailResolverService } from '../news-detail-resolver.service';
import { NewsListResolverService } from '../news-list-resolver.service';

const routes: Routes = [
  {
    path: '', children: [
      { path: '', component: NewsListComponent, resolve: {items: NewsListResolverService} },
      { path: ':id', component: NewsItemComponent, resolve: { item: NewsDetailResolverService } }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class NewsListRouteModule { }
