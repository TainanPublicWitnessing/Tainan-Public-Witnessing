export class AuthorityTable{
  
  constructor(authority_table: Array<AuthorityAction>){
    this.authority_table = authority_table;
  }
  
  authority_table: Array<AuthorityAction>;

  /**
   * @description get a list of actions that shows it has access right or not.
   * @param current_authority string
   * @returns { "action": true|false, ... }
   */
  getAuthoritys(current_authority: string){
    let result = {};
    for(let index in this.authority_table){
      result[this.authority_table[index].action] = this.authority_table[index].authoritys.includes(current_authority);
    }
    return result;
  }
}

export class AuthorityAction{
  action: string;
  authoritys: Array<string>;
}