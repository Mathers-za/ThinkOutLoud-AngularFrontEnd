import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendSearchBarComponent } from './friend-search-bar.component';

describe('FriendSearchBarComponent', () => {
  let component: FriendSearchBarComponent;
  let fixture: ComponentFixture<FriendSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendSearchBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
