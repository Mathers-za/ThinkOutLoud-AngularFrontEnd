import { Component, OnDestroy, OnInit } from '@angular/core';
import {
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

@Component({
  selector: 'app-profile-info-form',
  standalone: true,
  imports: [ReactiveFormsModule, FeedbackMessageComponent],
  templateUrl: './profile-info-form.component.html',
  styleUrl: './profile-info-form.component.scss',
})
export class ProfileInfoFormComponent implements OnDestroy, OnInit {
  userData!: IUser;
  subscriptions = new Subscription();

  profileForm = new FormGroup({
    age: new FormControl<string>(undefined, {
      validators: Validators.min(0),
      nonNullable: true,
    }),
    bio: new FormControl('', {
      validators: Validators.maxLength(150),
      nonNullable: true,
    }),
    gender: new FormControl<'Male' | 'Female' | 'Other' | ''>('', {
      validators: isOneOfSelection(['Male', 'Female', 'Other', '']),
      nonNullable: true,
    }),
  });
  errorMessage = '';
  successMessage = '';
  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.userService
        .getUser()
        .pipe(
          tap(({ data }) => {
            this.userData = data;

            this.profileForm.setValue({
              age: this.userData?.age ? this.userData.age.toString() : '',
              bio: this.userData?.bio ?? '',
              gender: this.userData?.gender ?? '',
            });
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }

  handleSubmit(): void {
    this.userService
      .updateUser(
        {
          $set: {
            ...this.profileForm.value,
            age: Number(this.profileForm.value.age),
          },
        },
        this.userData._id.toString()
      )
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
