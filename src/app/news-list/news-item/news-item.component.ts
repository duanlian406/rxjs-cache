import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit {
  item;
  currentPage;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(param => {
      if (!param.item) {
        this.router.navigate(['/newsList']);
      } else {
        this.item = param.item;
      }
    });
    this.route.paramMap.subscribe(param => {
      this.currentPage = +param.get('page') || 1;
    });
  }

}
