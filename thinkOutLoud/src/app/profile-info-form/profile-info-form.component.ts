import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { isOneOfSelection } from '../../custom form validator functions/customFormValidatorFns';
import { UsersService } from '../services/users.service';
interface IProfileForm {
  bio: string;
  age?: number | null;
  gender: 'Male' | 'Female' | 'Other' | '';
}

@Component({
  selector: 'app-profile-info-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile-info-form.component.html',
  styleUrl: './profile-info-form.component.scss',
})
export class ProfileInfoFormComponent {
  profileForm = this.formBuilder.group({
    gender: ['', isOneOfSelection(['Male', 'Female', 'Other', ''])],
    bio: ['', Validators.maxLength(150)],
    age: ['', Validators.min(0)],
  });
  constructor(
    private formBuilder: FormBuilder,
    private userServce: UsersService
  ) {}

  handleSubmit() {}
}
