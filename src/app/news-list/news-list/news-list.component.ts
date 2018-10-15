import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, withLatestFrom, take } from 'rxjs/operators';
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
  currentPage$ = new BehaviorSubject(1);
  currentNews$;
  setCurrentPage(n) {
    if (n <= 1) {
      n = 1;
    } else if (n > this.service.TOTAL_PAGE_COUNT / this.MAX_COUNT) {
      n = this.service.TOTAL_PAGE_COUNT / this.MAX_COUNT;
    }
    this.currentPage = n;
    this.currentPage$.next(n);
    this.service.getNews((n - 1) * this.MAX_COUNT, n * this.MAX_COUNT);
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
  constructor(private route: ActivatedRoute, private service: NewsService) {}

  ngOnInit() {
    this.route.data.subscribe(param => {
      const data = param.items;
      this.activeNews = data.activeNews;
      this.MAX_COUNT = data.count;
      this.MAX_PAGE = data.page;
      this.news$ = data.news;
      this.setCurrentPage(data.currentPage);
    });
    this.currentNews$ = this.currentPage$.pipe(withLatestFrom(this.news$, (cur, news) => {
      return news.slice((cur - 1) * this.MAX_COUNT, cur * this.MAX_COUNT);
    }));
    this.pages$ = this.currentPage$.pipe(map(this.getPageList.bind(this)));
  }

}
