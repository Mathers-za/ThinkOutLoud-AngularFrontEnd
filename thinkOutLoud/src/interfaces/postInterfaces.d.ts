import { IUser } from '../app/Interfaces/Users';

export interface IPostsSchema {
  _id: string;
  creatorId: Schema.Types.ObjectId;
  content: string;
  likes?: string[];
  comments?: {
    content: string;
    createdAt?: date;
    updatedAt?: date;
    commentatorId: string[];
  };
}

export interface IFeedPosts extends IPostsSchema {
  creatorDetails: {
    firstName: string;
    lastName: string;
    friends: string[];
    email: string;
  };

  numComments: number;
}
