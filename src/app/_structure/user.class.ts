import { sha256 } from "js-sha256";

export class User{

  /** variables */

  code = "" as string;  //random sha256 code, won't change after register
  id = "" as string;  //unique id map to code
  authority = "" as string;
  congregation = "" as string;
  identity = "" as string;
  marriage = "" as string;
  position = "" as string;
  gender = "" as string;
  baptize_date = "" as string;  //yyyy-mm-dd
  birth_date = "" as string;  //yyyy-mm-dd
  cellphone = "" as string;  
  email = "" as string;  //xxx@xxx.xxx
  phone = "" as string;
  address = "" as string;
  name = "" as string;
  note = "" as string;
  language = "" as string;

  /** functions */

  //generate random sha256 user code
  public generateCode(){
    this.code = sha256(new Date().toISOString());
  }

  public getFirebaseAuthEmail(){
    return this.code + "@Tainan.Public.Witnessing";
  }

  public static transformToFirebaseAuthEmail(code: string){
    return code + "@Tainan.Public.Witnessing";
  }
}