import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetAnalyzerComponent } from './tweet-analyzer.component';

describe('TweetAnalyzerComponent', () => {
  let component: TweetAnalyzerComponent;
  let fixture: ComponentFixture<TweetAnalyzerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TweetAnalyzerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetAnalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
