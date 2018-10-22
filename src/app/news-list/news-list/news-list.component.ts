import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, withLatestFrom, mapTo, merge, takeWhile } from 'rxjs/operators';
import { NewsService } from '../news.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
  activeNews;
  currentPage = 1;
  MAX_COUNT;
  MAX_PAGE;
  pages$;
  news$;
  update$;
  currentPage$ = new BehaviorSubject(1);
  currentNews$;
  fetchUpdate() {
    this.service.updateComplete$.next(false);
  }
  setCurrentPage(n) {
    this.currentPage$.next(this.currentPage = Math.max(1, Math.min(this.service.TOTAL_PAGE_COUNT / this.MAX_COUNT, n)) || 1);
  }
  getPageList(cur) {
    let m = Math.floor(cur / this.MAX_PAGE);
    m = cur % this.MAX_PAGE ? m : m - 1;
    const arr = [];
    for (let i = 1; i <= this.MAX_PAGE; i++) {
      if (m * this.MAX_PAGE + i > this.service.TOTAL_PAGE_COUNT / this.MAX_COUNT) {
        break;
      } else {
        arr.push(m * this.MAX_PAGE + i);
      }
    }
    return arr;
  }
  constructor(private route: ActivatedRoute, private service: NewsService) { }

  ngOnInit() {
    this.route.data.subscribe(param => {
      ({ activeNews: this.activeNews, count: this.MAX_COUNT, page: this.MAX_PAGE, news: this.news$ } = param.items);
      this.setCurrentPage(param.items.currentPage);
    });
    this.currentNews$ = this.currentPage$.pipe(withLatestFrom(this.news$, (cur, news) => {
      return news.slice((cur - 1) * this.MAX_COUNT, cur * this.MAX_COUNT);
    }));
    this.pages$ = this.currentPage$.pipe(map(this.getPageList.bind(this)));
  }

}
