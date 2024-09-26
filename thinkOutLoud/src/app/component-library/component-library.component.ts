import { Component, computed, signal } from '@angular/core';
import { FeedbackMessageComponent } from '../feedback-message/feedback-message.component';
import { ProfileInfoFormComponent } from '../profile-info-form/profile-info-form.component';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Iitem {
  id: number;
  item: string;
  price: number;
}

@Component({
  selector: 'app-component-library',
  standalone: true,
  imports: [
    FeedbackMessageComponent,
    ProfileInfoFormComponent,
    NgFor,
    FormsModule,
  ],
  templateUrl: './component-library.component.html',
  styleUrl: './component-library.component.scss',
})
export class ComponentLibraryComponent {
  options = signal([1, 2, 3, 4, 5]);
  selectedOption = signal(1);
  item: Iitem = {
    id: 10,
    item: 'hammer',
    price: 10,
  };

  handleSelectChange(value: number): void {
    this.selectedOption.set(value);
  }

  calcPrice = computed(() => {
    return this.item.price + this.selectedOption();
  });
}
