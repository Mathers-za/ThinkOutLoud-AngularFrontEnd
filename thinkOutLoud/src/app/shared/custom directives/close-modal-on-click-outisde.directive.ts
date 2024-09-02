import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  OnDestroy,
  Output,
  Renderer2,
} from '@angular/core';
import { filter, fromEvent, Subscription } from 'rxjs';

@Directive({
  selector: '[appCloseModalOnClickOutisde]',
  standalone: true,
})
export class CloseModalOnClickOutisdeDirective
  implements AfterViewInit, OnDestroy
{
  @Output() clickedOutSide = new EventEmitter<void>();
  clickSubscription$: Subscription | null = null;
  constructor(
    private refElement: ElementRef,

    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterViewInit(): void {
    fromEvent(this.document, 'mousedown')
      .pipe(
        filter(
          (event) => !this.checkClickedOutside(event.target as HTMLElement)
        )
      )
      .subscribe(() => {
        this.clickedOutSide.emit();
      });
  }

  checkClickedOutside(clickElement: HTMLElement): boolean {
    return (
      clickElement === this.refElement.nativeElement ||
      this.refElement.nativeElement.contains(clickElement)
    );
  }
  ngOnDestroy(): void {
    this.clickSubscription$?.unsubscribe();
  }
}
