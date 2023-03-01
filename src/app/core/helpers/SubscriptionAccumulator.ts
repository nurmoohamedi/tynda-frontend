import {Injectable, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";

@Injectable()
export class SubscriptionAccumulator implements OnDestroy {
  subscriptionList: Subscription[] = [];

  ngOnDestroy() {
    this.unSubscribeAll();
  }

  unSubscribeAll(): void {
    this.subscriptionList.forEach(subscription => {
      if (subscription) {
        subscription.unsubscribe();
      }
    })
  }

  addSubscriber(s: Subscription): void {
    this.subscriptionList[this.subscriptionList.length] = s;
  }

}
