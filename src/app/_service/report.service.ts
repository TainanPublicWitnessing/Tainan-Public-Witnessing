import { Injectable } from '@angular/core';

/** firebase */
import { AngularFirestore } from "@angular/fire/firestore";
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private angularFirestore: AngularFirestore,
    private dataPipe: DatePipe
  ){}

  /** from old DB */
  getMonthlyStatisticAsCSV(yyyyMM: string): Promise<string>{
    let result: string = "上傳時間,日期,班次,地點,姓名,資料,影片,經文,續訪,同意拜訪,參與人數,經驗\n";
    return this.angularFirestore.collection("Statistics/ShiftReport/" + yyyyMM).get().toPromise().then(response=>{
      response.docs.sort((a,b)=>{
        return a.data().date.localeCompare(b.data().date);
      }).forEach(doc=>{
        const data = doc.data();
        result = result.concat(
          this.dataPipe.transform(data.create_on.toDate(),"yyyy-MM-dd HH:mm"), ",",
          data.date, ",",
          data.shift_title, ",",
          data.site, ",",
          data.name, ",",
          data.report.tracts, ",",
          data.report.videos, ",",
          data.report.scriptures, ",",
          data.report.return_visits, ",",
          data.report.agree_visit, ",",
          data.report.attendance, ",",
          data.report.experience, "\n"
        );
      });
      return result;
    });
  }
}
