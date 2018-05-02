import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-classify',
  templateUrl: './classify.component.html',
  styleUrls: ['./classify.component.css']
})
export class ClassifyComponent implements OnInit {
  isPositive: any = false;
  requested: any = false;
  loader: any = false;

  constructor(private _http: HttpClient) { }

  classify(text) {
    this.loader = true;
    this._http.post<any>("/api/classify", {text: text.toLowerCase()})
    .subscribe(res => {
      this.requested = true;
      this.loader = false;
      console.log(res.result);
      if (res.result == 'positive') {
        this.isPositive = true;
      } else {
        this.isPositive = false;
      }
    });
  }

  onKey(event: any) {
    this.requested = false;
  }
  ngOnInit() {
  }

}
