import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() type = '';
  @Input() value = '';
  @Input() name = '';
  @Input() label = '';
  @Input() id = '';
  @Input() isVisible: boolean = true;
}
