import { Subscription } from "rxjs";

export class SubscribeManager{
  public subscriptions: Array<Subscription> = [];

  unsubscribe(){
    for(let index in this.subscriptions){
      this.subscriptions[index].unsubscribe();
    }
  }
}