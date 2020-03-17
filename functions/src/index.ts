import * as functions from 'firebase-functions';
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
//獲取firestore資料庫
const db = admin.firestore();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

exports.scheduledFunctionCrontab = functions.pubsub.schedule('00 09 * * *')
  .timeZone('Asia/Taipei') // Users can choose timezone - default is America/Los_Angeles
  .onRun((run) => {
  return getTomorrowShift();
});

// exports.onShiftReportAdded = functions.firestore
//   .document("Statistics/ShiftReport").onCreate((change, context) => {  
//     console.log(change,context);
//   })

// exports.onShiftReportAdded = functions.firestore
//   .document("Statistics/ShiftReport/{month}/{reportId}").onCreate((change, context) => {  
//     console.log(change,context);
//   })



function sendLineNotify(message: any){
  //台南市都市公眾場所特別見證 群組
  //3GkU0blKAbS9Rbk4cQlz1dHpzYQRfQCJYV762iRBz95
  //Line Notify 測試 群組
  //WQfy8pLT6iSkPc5K0Isl2IYhhbGAoYehifrVa9F8jCW
  const rp = require('request-promise');
  const options = {
    uri: 'https://notify-api.line.me/api/notify',
    headers: {
      "method" : "POST",
      "Content-Type": "application/x-www-form-urlencoded",
      // "Access-Control-Allow-Origin": "*",
      "Authorization" : "Bearer " + '3GkU0blKAbS9Rbk4cQlz1dHpzYQRfQCJYV762iRBz95',
    },
    formData:{
      'message': message
    }
  };

  rp.post(options)
    .then(function (body:any) {
        // POST succeeded...
        console.log(body);
    })
    .catch(function (err:any) {
        // POST failed...
        console.log("error", err);
    });
  return null;
}

function getTomorrowShift(){
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
  return promise.then((snapshot: { docs: string | any[]; }) => {
      //獲取資料
      const result = [];
      const length = snapshot.docs.length;
      for (let i = 0; i < length; i++) {
          result.push(snapshot.docs[i].data());
      }
      sortDateShift(result);
  })
  
}

function sortDateShift(data:Array<any>) {
  let message = "";
  const Sites: any[] = [];
  //抓取不同地點
  for (const shift of data) {
      if (!Sites.includes(shift.site)) {
          Sites.push(shift.site);
      }
  }

  for(const sit of Sites){
    const sitShift = data.filter(shift => shift.site === sit);
    //reset message date and site
    message = "\n" +"日期 : " +data[0].date.split('-').join('/') +"(" +data[0].day +")";
    message += "\n" +"地點 : " +sit +'\n';

    //set shift data
    const morringShift = sitShift.find(shift => shift.shift_title === "早上");
    if(morringShift){
      message += '\n' +'[' +morringShift.shift_title +']';
      message += morringShift.members[0] +", " 
                +morringShift.members[1] +", " 
                +morringShift.members[2] +", " 
                +morringShift.members[3] +'\n';
    }

    const noonShift = sitShift.find(shift => shift.shift_title === "中午");
    if(noonShift){
      message += '\n' +'[' +noonShift.shift_title +']';
      message += noonShift.members[0] +", " 
                +noonShift.members[1] +", " 
                +noonShift.members[2] +", " 
                +noonShift.members[3] +'\n';
    }

    const afternoonShift = sitShift.find(shift => shift.shift_title === "下午");
    if(afternoonShift){
      message += '\n' +'[' +afternoonShift.shift_title +']';
      message += afternoonShift.members[0] +", " 
                +afternoonShift.members[1] +", " 
                +afternoonShift.members[2] +", " 
                +afternoonShift.members[3] +'\n';
    }
    //sent one site message
    sendLineNotify(message);
  }
  
  return message;
}




