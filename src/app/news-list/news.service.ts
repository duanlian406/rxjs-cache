import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { filter, shareReplay, concatAll, concat, scan, combineLatest, tap, map, startWith, mergeAll, take } from 'rxjs/operators';

@Injectable()
export class NewsService {
  private socket;
  private API = 'http://localhost:8888/';
  private NEWS_COUNT;
  private PAGES_COUNT;
  private news$;
  private update$;
  TOTAL_PAGE_COUNT;
  initNews() {
    if (!this.news$) {
      this.news$ = this.update$.pipe(scan((acc, cur) => [...acc, ...cur]), shareReplay(1));
      this.socket.emit('getNews', { start: 0, end: this.PAGES_COUNT * this.NEWS_COUNT });
    }
    return {
      count: this.NEWS_COUNT,
      page: this.PAGES_COUNT,
      news: this.news$
    };
  }
  getNewsDetail(id) {
    return this.news$.pipe(take(1), mergeAll(), filter(item => item.id === +id));
  }
  getNews(s, e) {
    this.socket.emit('getNews', { start: s, end: this.PAGES_COUNT * e });
  }
  constructor(conf) {
    this.API = conf.api;
    this.NEWS_COUNT = conf.count;
    this.PAGES_COUNT = conf.page;
    this.socket = io(this.API);
    this.update$ = Observable.create(ob => {
      this.socket.on('news', (data) => {
        this.TOTAL_PAGE_COUNT = data.total;
        ob.next(data.data);
      });
    });
  }
}
