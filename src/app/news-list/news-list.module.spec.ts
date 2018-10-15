import { NewsListModule } from './news-list.module';

describe('NewsListModule', () => {
  let newsListModule: NewsListModule;

  beforeEach(() => {
    newsListModule = new NewsListModule();
  });

  it('should create an instance', () => {
    expect(newsListModule).toBeTruthy();
  });
});
