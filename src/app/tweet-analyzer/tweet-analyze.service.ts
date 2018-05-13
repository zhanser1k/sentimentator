import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TweetAnalyzeService {

  constructor(private _http: HttpClient) { }

  analyzeTweets(searchText, count) {
    return this._http.post('/api/tweets', { searchText, count })
  }

}
