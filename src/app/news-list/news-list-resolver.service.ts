import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NewsService } from './news.service';
import { take, map, toArray, switchMap } from 'rxjs/operators';

@Injectable()
export class NewsListResolverService implements Resolve<any> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const o = this.service.initNews();
    let id = +route.paramMap.get('id');
    let page = +route.paramMap.get('page');
    return o.news.pipe(
      take(1),
      map(items => {
        if (!items.find(item => item.id === id)) {
          id = null;
        }
        if (page > this.service.TOTAL_PAGE_COUNT / o.count || page < 1) {
          page = 1;
        }
        return { count: o.count, page: o.page, news: o.news, activeNews: id, currentPage: page };
      }));
  }
  constructor(private service: NewsService) { }
}
