import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { NewsService } from './news.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class NewsDetailResolverService implements Resolve<any> {
  resolve(route) {
    return this.service.getNewsDetail(route.paramMap.get('id'));
  }
  constructor(private service: NewsService, private router: Router) { }
}
