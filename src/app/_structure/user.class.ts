import { sha256 } from "js-sha256";

export class User{

  /** variables */

  code: string;  //random sha256 code, won't change after register
  id: string;  //unique id map to code
  authority: string;
  congregation: string;
  identity: string;
  marriage: string;
  position: string;
  gender: string;
  baptize_date: string;  //yyyy-mm-dd
  birth_date: string;  //yyyy-mm-dd
  cellphone: string;  
  email: string;  //xxx@xxx.xxx
  phone: string;
  address: string;
  name: string;
  note: string;
  language: string;

  /** functions */

  //generate random sha256 user code
  public generateCode(){
    this.code = sha256(new Date().toISOString());
  }

  public getFirebaseAuthEmail(){
    return this.code + "@Tainan.Public.Witnessing";
  }
}