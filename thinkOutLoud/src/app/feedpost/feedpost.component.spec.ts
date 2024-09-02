import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedpostComponent } from './feedpost.component';

describe('FeedpostComponent', () => {
  let component: FeedpostComponent;
  let fixture: ComponentFixture<FeedpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedpostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
