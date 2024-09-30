import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedbackMessageStateService {
  private showMessageComponent$ = new Subject<boolean>();
  showFeedBackComponent$ = this.showMessageComponent$.asObservable();
  private timeout: null | number = null;
  private _timeOutDuration = 2000;
  private _severity = new BehaviorSubject<'success' | 'error' | 'warning'>(
    'success'
  );
  severity$ = this._severity.asObservable();
  private _message = new BehaviorSubject('');
  private _visible = new BehaviorSubject(false);
  visibility$ = this._visible.asObservable();
  message$ = this._message.asObservable();

  constructor() {}

  showFeedBackComponentOnTimer(): void {
    this.showFeedbackComponent();
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    setTimeout(() => {
      this.hideFeedBackComponent();
    }, this._timeOutDuration);
  }

  setMessage(message: string) {
    this._message.next(message);
  }
  showFeedbackComponent() {
    this._visible.next(true);
  }

  hideFeedBackComponent() {
    this._visible.next(false);
  }

  setSeverity(severity: 'warning' | 'success' | 'error') {
    this._severity.next(severity);
  }

  set timeoutDuration(timeMs: number) {
    if (timeMs < 0 || timeMs > 5000) {
      throw new Error(
        'Time cannot be less than zero or greater than 5 seconds'
      );
    }
    this._timeOutDuration = timeMs;
  }
}
