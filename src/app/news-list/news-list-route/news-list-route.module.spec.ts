import { NewsListRouteModule } from './news-list-route.module';

describe('NewsListRouteModule', () => {
  let newsListRouteModule: NewsListRouteModule;

  beforeEach(() => {
    newsListRouteModule = new NewsListRouteModule();
  });

  it('should create an instance', () => {
    expect(newsListRouteModule).toBeTruthy();
  });
});
