import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
export interface IFeedbackConfig {
  severity?: 'error' | 'success' | 'warning';
  message?: string;
  visibility: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class FeedbackMessageStateService {
  private timeout: null | number = null;

  private feedbackMessageSubject = new Subject<IFeedbackConfig>();
  feedbackMessageConfig$ = this.feedbackMessageSubject.asObservable();

  constructor() {}

  showFeedBackComponentOnTimer(
    config: IFeedbackConfig,
    timer: number | undefined = 2000
  ): void {
    this.showFeedbackComponent(config);
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    setTimeout(() => {
      this.hideFeedBackComponent();
    }, timer);
  }

  showFeedbackComponent(config: IFeedbackConfig) {
    this.feedbackMessageSubject.next(config);
  }

  hideFeedBackComponent() {
    this.feedbackMessageSubject.next({ visibility: false });
  }
}
