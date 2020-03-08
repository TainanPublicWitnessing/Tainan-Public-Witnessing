"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
//import { DatePipe } from '@angular/common';
// // S-tart writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
admin.initializeApp();
exports.getCongregations = functions.https.onRequest((request, response) => {
    const db = admin.firestore();
    const docs = 'LineNotify/peter';
    const promise = db.doc(docs).get();
    console.log(docs);
    promise.then(snapshot => {
        const data = snapshot.data();
        console.log('success');
        console.log(data);
        response.send(data);
    }).catch(error => {
        console.log('fail');
        console.log(error);
    });
});
exports.getEveryDayShift = functions.https.onRequest((request, response) => {
    //獲取firestore資料庫
    const db = admin.firestore();
    //獲取今天日期
    const tomorrow = new Date(Date.now() + 1 * 1000 * 60 * 60 * 24);
    console.log(tomorrow);
    //處理日期格式 => "yyyMM"
    const year = tomorrow.getFullYear().toString();
    const m = tomorrow.getMonth() + 1;
    const month = (m <= 9 ? '0' + m : m);
    //處理明天日期格式 => "yyyy-mm-dd"
    const d = tomorrow.getDate();
    const date = (d <= 9 ? '0' + d : d);
    const tomorrowDate = year + "-" + month + "-" + date;
    //處理資料庫位置
    const docs = 'MonthlyData/' + year + month;
    //獲取資料庫資料
    const promise = db.doc(docs).collection("shift").where("date", "==", tomorrowDate).get();
    promise.then(snapshot => {
        //獲取資料
        const result = [];
        const length = snapshot.docs.length;
        for (let i = 0; i < length; i++) {
            result.push(snapshot.docs[i].data());
        }
        console.log('success');
        const data = sortDateShift(result);
        response.send(data);
    }).catch(error => {
        console.log('fail');
        console.log(error);
    });
});
exports.scheduledFunctionCrontab = functions.pubsub.schedule('30 11 * * *')
    .timeZone('Asia/Taipei') // Users can choose timezone - default is America/Los_Angeles
    .onRun((context) => {
    console.log('Hi, This is a clock');
    return null;
});
function sortDateShift(_shifts) {
    const result = [];
    const Site = [];
    //抓取不同地點
    for (const data of _shifts) {
        if (!Site.includes(data.site)) {
            Site.push(data.site);
        }
    }
    let dataArray = [];
    dataArray = Object.values(_shifts);
    //抓取不同地點班表
    for (const _site of Site) {
        const thisSite = {
            "早上": dataArray.find(x => x.shift_title == "早上" && x.site == _site),
            "中午": dataArray.find(x => x.shift_title == "中午" && x.site == _site),
            "下午": dataArray.find(x => x.shift_title == "下午" && x.site == _site)
        };
        result.push(Object.values(thisSite));
    }
    return result;
}
//# sourceMappingURL=index.js.map