import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit {

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
  //   console.log("line notify sent")
  //   const url = 'https://notify-api.line.me/api/notify';

  //   let headers = new HttpHeaders({
  //     "method" : "POST",
  //     "Content-Type": "application/x-www-form-urlencoded",
  //     // "Access-Control-Allow-Origin": "*",
  //     "Authorization" : "Bearer " + 'WQfy8pLT6iSkPc5K0Isl2IYhhbGAoYehifrVa9F8jCW',
  //   });

  //   let options = {
  //     headers,
  //     "params":{
  //       'message':"testing"
  //     }
  //   };
    
  //   let body = {"message": 'testing'};
  //   this.http.post<any>(url, body, options)
  //     .subscribe((data) => {
  //       console.log(data);
  //     });
  }

}
