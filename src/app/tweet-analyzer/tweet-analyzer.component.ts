import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TweetAnalyzeService } from './tweet-analyze.service';

@Component({
  selector: 'app-tweet-analyzer',
  templateUrl: './tweet-analyzer.component.html',
  styleUrls: ['./tweet-analyzer.component.css']
})
export class TweetAnalyzerComponent implements OnInit {
  model = {
    searchText: '',
    count: 10
  }
  loading = false;
  error = '';
  requested = false;
  result: any;
  showExtended = false;
  countOptions = [10, 20, 30, 40, 50];

  constructor(private _tweetService: TweetAnalyzeService) { }

  ngOnInit() {
  }

  onKey(event: any) {
    this.requested = false;
  }

  toggleExtendedInfo() {
    this.showExtended = !this.showExtended;
  }

  reset() {
    this.requested = false;
    this.result = '';
    this.error = '';
    this.model.searchText = '';
    this.model.count = 10;
    this.showExtended = false;
  }

  analyze() {
    this.loading = true;
    this.requested = true;
    this._tweetService.analyzeTweets(this.model.searchText, this.model.count)
      .subscribe(res => {
        this.result = res;
        this.loading = false;
      }, err => {
        console.log(err);
        this.error = 'Неизвестная ошибка';
        this.loading = false;
      });
  }
}