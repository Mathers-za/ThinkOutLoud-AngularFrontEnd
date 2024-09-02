import { Component, Input } from '@angular/core';
import { IFeedPosts } from '../../interfaces/postInterfaces';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-feedpost',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './feedpost.component.html',
  styleUrl: './feedpost.component.scss',
})
export class FeedpostComponent {
  @Input() postContent!: IFeedPosts;
}
