import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { isOneOfSelection } from '../../custom form validator functions/customFormValidatorFns';
import { UsersService } from '../services/users.service';
import { catchError, EMPTY, Subscription, tap } from 'rxjs';
import { FeedbackMessageComponent } from '../feedback-message/feedback-message.component';
import { IUser } from '../Interfaces/Users';
export interface IProfileForm {
  bio: string | null;
  age: number | null;
  gender: 'Male' | 'Female' | 'Other' | '';
}

@Component({
  selector: 'app-profile-info-form',
  standalone: true,
  imports: [ReactiveFormsModule, FeedbackMessageComponent],
  templateUrl: './profile-info-form.component.html',
  styleUrl: './profile-info-form.component.scss',
})
export class ProfileInfoFormComponent implements OnInit, OnDestroy {
  userData: IUser | null = null;
  userSubsciption?: Subscription;
  profileForm = new FormGroup({
    age: new FormControl<number | null>(
      this.userData?.age ?? null,
      Validators.min(0)
    ),
    bio: new FormControl(this.userData?.bio ?? '', Validators.maxLength(150)),
    gender: new FormControl(
      this.userData?.gender ?? '',
      isOneOfSelection(['Male', 'Female', 'Other', ''])
    ),
  });

  errorMessage = '';
  successMessage = '';
  constructor(private userServce: UsersService) {}

  ngOnInit(): void {
    this.userSubsciption = this.userServce.user$
      .pipe(tap((userData) => (this.userData = userData)))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.userSubsciption?.unsubscribe();
  }

  handleSubmit(): void {
    this.userServce
      .updateUser({
        $set: this.profileForm.value as IProfileForm,
      })
      .pipe(
        tap(() => (this.successMessage = 'Update successful')),
        catchError((err) => {
          this.errorMessage = err.message;
          return EMPTY;
        })
      )
      .subscribe();
  }
}
