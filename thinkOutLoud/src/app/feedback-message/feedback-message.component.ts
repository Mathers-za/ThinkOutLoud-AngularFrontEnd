import { NgClass, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feedback-message',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './feedback-message.component.html',
  styleUrl: './feedback-message.component.scss',
})
export class FeedbackMessageComponent {
  @Input() message: string = '';
  @Input() severity: 'success' | 'error' | 'warning' = 'success';
  @Input() fullWidth: boolean = false;
}
