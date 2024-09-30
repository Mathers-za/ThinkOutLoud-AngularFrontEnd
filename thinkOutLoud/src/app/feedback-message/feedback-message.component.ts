import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IFeedbackConfig } from '../feedback-message-state.service';

@Component({
  selector: 'app-feedback-message',
  standalone: true,
  imports: [NgClass, NgStyle, NgIf],
  templateUrl: './feedback-message.component.html',
  styleUrl: './feedback-message.component.scss',
})
export class FeedbackMessageComponent {
  @Input() fullWidth: boolean = false;
  @Input({ required: true }) config: IFeedbackConfig = { visibility: false };
}
