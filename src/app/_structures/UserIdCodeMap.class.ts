export class UserIdCodeMap{

  constructor(users_id_code_map: Array<UserIdCodeMapNode>){
    this.users_id_code_map = users_id_code_map;
  }

  /** variables */
  users_id_code_map: Array<UserIdCodeMapNode>;

  /** functions */
  getUserIds(){
    let result = [];
    for(let index in this.users_id_code_map){
      result.push(this.users_id_code_map[index].id);
    }

    //sort before return
    return result.sort((A: string, B: string)=>{
      return A.localeCompare(B);
    });
  }

  getUserCodeById(id: string){
    return this.users_id_code_map.find(node=>{
      return node.id == id;
    }).code;
  }
}

export class UserIdCodeMapNode{
  
  constructor(code: string,id: string){
    this.code = code;
    this.id = id;
  }
  
  /** variables */
  code: string;
  id: string;

}