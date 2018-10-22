import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subject, timer, BehaviorSubject } from 'rxjs';
import { filter, shareReplay, scan, mergeAll, take, takeUntil, map, tap, merge, withLatestFrom, mapTo } from 'rxjs/operators';

@Injectable()
export class NewsService {
  private socket;
  private API;
  private NEWS_COUNT;
  private PAGES_COUNT;
  private PRELOAD_INTERVAL;
  private news$;
  private getNews$;
  private updateNews$;
  private update$;
  private loadComplete$ = new Subject();
  updateComplete$ = new Subject();
  hasUpdate$ = new BehaviorSubject(false);
  TOTAL_PAGE_COUNT;
  initNews() {
    if (!this.news$) {
      this.updateNews$ = this.updateComplete$.pipe(withLatestFrom(this.update$, (b, param) => param), map(param => {
        this.TOTAL_PAGE_COUNT = param.total;
        return param.data;
      }));
      this.news$ = this.getNews$.pipe(
        scan((acc, cur) => [...acc, ...cur]),
        tap(news => {
          if (news.length >= this.TOTAL_PAGE_COUNT) {
            this.loadComplete$.next();
          }
        }),
        merge(this.updateNews$),
        shareReplay(1),
      );
      this.preLoadNews(this.PRELOAD_INTERVAL);
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
  preLoadNews(time) {
    timer(0, time).pipe(
      takeUntil(this.loadComplete$),
      map(this.getNews.bind(this))
    ).subscribe();
  }
  getNews(n) {
    this.socket.emit('getNews',
      { start: n * this.NEWS_COUNT * this.PAGES_COUNT, end: (n + 1) * this.NEWS_COUNT * this.PAGES_COUNT });
  }
  constructor(conf) {
    ({ api: this.API, count: this.NEWS_COUNT, page: this.PAGES_COUNT, preloadInterval: this.PRELOAD_INTERVAL } = conf);
    this.socket = io(this.API);
    this.getNews$ = Observable.create(ob => {
      this.socket.on('news', (res) => {
        this.TOTAL_PAGE_COUNT = res.total;
        ob.next(res.data);
      });
    });
    this.update$ = Observable.create(ob => {
      this.socket.on('update', (res) => {
        ob.next(res);
      });
    });
    this.hasUpdate$ = this.update$.pipe(mapTo(true), merge(this.updateComplete$), shareReplay(1));
  }
}
