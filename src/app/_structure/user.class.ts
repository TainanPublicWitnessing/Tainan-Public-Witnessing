export class User{

  /** variables */

  code: string;  //random sha code, won't change after register
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

  validation_status = {
    code: true,
    id: true,
    authority: true,
    congregation: true,
    identity: true,
    marriage: true,
    position: true,
    gender: true,
    baptize_date: true,
    birth_date: true,
    cellphone: true,  
    email: true,
    phone: true,
    address: true,
    name: true,
    note: true,
    language: true
  }

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
    this.gender = "";
  }

  public validate(options){
    if(!this.code){
      return "ERROR_CODE";
    }
    if(!this.name){
      return "ERROR_NAME";
    }
    if(options.ids.includes(this.id)){
      return "ERROR_ID";
    }
    if(!options.authoritys.includes(this.authority)){
      return "ERROR_AUTHORITY";
    }
    if(!options.congregations.includes(this.congregation)){
      return "ERROR_CONGREGATION";
    }
    if(!options.identitys.includes(this.identity)){
      return "ERROR_IDENTITY";
    }
    if(!options.marriages.includes(this.marriage)){
      return "ERROR_MARRIAGE";
    }
    if(!options.positions.includes(this.position)){
      return "ERROR_POSITION";
    }
    if(!options.genders.includes(this.gender)){
      return "ERROR_GENDER";
    }
    if(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/g.test(this.baptize_date)){
      return "ERROR_BAPTIZE_DATE";
    }
    if(/^$|^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/g.test(this.birth_date)){
      return "ERROR_BIRTH_DATE";
    }
    if(/^$|^09\d{8}$/g.test(this.cellphone)){
      return "ERROR_CELLPHONE";
    }
    if(/^$|^\S+@\S+\.\S+$/g.test(this.email)){
      return "ERROR_EMAIL";
    }
    return "SECCESS";
  }
}