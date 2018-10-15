import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsItemComponent } from './news-item/news-item.component';
import { NewsListRouteModule } from './news-list-route/news-list-route.module';
import { NewsService } from './news.service';
import { NewsDetailResolverService } from './news-detail-resolver.service';
import { NewsListResolverService } from './news-list-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    NewsListRouteModule,
  ],
  declarations: [NewsListComponent, NewsItemComponent],
  providers: [
    NewsDetailResolverService,
    NewsListResolverService,
    {
      provide: 'LIST_CONF', useValue: {
        api: 'http://localhost:8888/',
        count: 10,
        page: 5,
      }
    },
    {
      provide: NewsService,
      useFactory: (conf) => new NewsService(conf),
      deps: ['LIST_CONF']
    }
  ]
})
export class NewsListModule { }
