import { Component } from '@angular/core';
import { FeedbackMessageComponent } from '../feedback-message/feedback-message.component';

@Component({
  selector: 'app-component-library',
  standalone: true,
  imports: [FeedbackMessageComponent],
  templateUrl: './component-library.component.html',
  styleUrl: './component-library.component.scss',
})
export class ComponentLibraryComponent {}
