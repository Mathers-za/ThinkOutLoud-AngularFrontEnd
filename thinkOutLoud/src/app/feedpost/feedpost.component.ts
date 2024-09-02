import { Component, Input } from '@angular/core';
import { IPostsSchema } from '../../interfaces/postInterfaces';

@Component({
  selector: 'app-feedpost',
  standalone: true,
  imports: [],
  templateUrl: './feedpost.component.html',
  styleUrl: './feedpost.component.scss',
})
export class FeedpostComponent {
  @Input() postContent!: IPostsSchema;
}
