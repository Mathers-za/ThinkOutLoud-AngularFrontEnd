import { Component } from '@angular/core';
import { FeedbackMessageComponent } from '../feedback-message/feedback-message.component';
import { ProfileInfoFormComponent } from '../profile-info-form/profile-info-form.component';

@Component({
  selector: 'app-component-library',
  standalone: true,
  imports: [FeedbackMessageComponent, ProfileInfoFormComponent],
  templateUrl: './component-library.component.html',
  styleUrl: './component-library.component.scss',
})
export class ComponentLibraryComponent {}
