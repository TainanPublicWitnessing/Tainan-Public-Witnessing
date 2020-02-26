import { Subscription } from "rxjs";

export class SubscribeManager{
  private subscriptions: Subscription[] = [];

  pushSubscriptions(...subscriptions: Subscription[]){
    this.subscriptions.concat(subscriptions);
  }

  unsubscribeAll(){
    for(let index in this.subscriptions){
      this.subscriptions[index].unsubscribe();
    }
  }
}