import * as functions from 'firebase-functions';




// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  
});




// const lineNotify =  class LineNotify{

//   constructor(
//     private http: HttpClient,
//   ){}

//   sendLineNotify(){
//     const url = 'https://notify-api.line.me/api/notify';

//     const headers = new HttpHeaders({
//       "method" : "POST",
//       "Content-Type": "application/x-www-form-urlencoded",
//       // "Access-Control-Allow-Origin": "*",
//       "Authorization" : "Bearer " + 'WQfy8pLT6iSkPc5K0Isl2IYhhbGAoYehifrVa9F8jCW',
//     });

//     const options = {
//       headers,
//       "params":{
//         'message':"testing"
//       }
//     };
    
//     const body = {"message": 'testing in functions'};
//     this.http.post<any>(url, body, options)
//       .subscribe((data) => {
//         console.log(data);
//       });
//   }
// }





