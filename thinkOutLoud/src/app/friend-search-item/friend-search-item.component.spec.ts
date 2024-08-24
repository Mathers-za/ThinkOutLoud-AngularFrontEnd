import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendSearchItemComponent } from './friend-search-item.component';

describe('FriendSearchItemComponent', () => {
  let component: FriendSearchItemComponent;
  let fixture: ComponentFixture<FriendSearchItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendSearchItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FriendSearchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
