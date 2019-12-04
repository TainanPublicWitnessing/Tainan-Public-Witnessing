export class User{

  /** variables */

  code: string;  //random sha code, won't change after register
  id: string;  //unique id map to code

  //value range is given
  authority: string;
  congregation: string;
  identity: string;
  marriage: string;
  position: string;
  sex: string;

  //value format is given
  baptize_date: string;  //yyyy-mm-dd  /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/g
  birth_date: string;  //yyyy-mm-dd  /^$|^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/g
  cellphone: string;  //xxxx-xxx-xxx  /^$|^09\d{2}-\d{3}-\d{3}$/g
  email: string;  //xxx@xxx.xxx  /^$|^\S+@\S+\.\S+$/g
  phone: string;  //xx-xxx-xxxx  /^$|^0\d{1,3}-\d{2,4}-\d{4}$/g
  
  //no format
  address: string;
  name: string;
  note: string;
  language: string;

  /** functions */

  constructor(){
    this.reset();
  }

  public reset(){
    this.code = "";
    this.id = "";

    this.authority = "";
    
    this.address = "";
    this.baptize_date = "";
    this.birth_date = "";
    this.cellphone = "";
    this.congregation = "";
    this.email = "";
    this.identity = "";
    this.language = "";
    this.marriage = "";
    this.name = "";
    this.note = "";
    this.phone = "";
    this.position = "";
    this.sex = "";
  }
}