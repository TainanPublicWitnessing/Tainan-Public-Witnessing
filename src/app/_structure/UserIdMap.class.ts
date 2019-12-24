export class UserIdMap{
  public id_map: Array<UserIdMapNode>;

  constructor(id_map: Array<UserIdMapNode>){
    this.id_map = id_map;
  }

  public getUserIds(){
    let result = [];
    for(let index in this.id_map){
      result.push(this.id_map[index].id);
    }
    return result.sort((A: string, B: string)=>{
      return A.localeCompare(B);
    });
  }
}

export class UserIdMapNode{
  public code: string;
  public id: string;

  constructor(code,id){
    this.code = code;
    this.id = id;
  }
}