export class UserIdMap{

  constructor(id_map: Array<UserIdMapNode>){
    this.id_map = id_map;
  }

  /** variables */
  id_map: Array<UserIdMapNode>;

  /** functions */
  getUserIds(){
    let result = [];
    for(let index in this.id_map){
      result.push(this.id_map[index].id);
    }

    //sort before return
    return result.sort((A: string, B: string)=>{
      return A.localeCompare(B);
    });
  }

  getUserCodeById(id: string){
    return this.id_map.find(node=>{
      return node.id == id;
    }).code;
  }
}

export class UserIdMapNode{
  
  constructor(code: string,id: string){
    this.code = code;
    this.id = id;
  }
  
  /** variables */
  code: string;
  id: string;

}