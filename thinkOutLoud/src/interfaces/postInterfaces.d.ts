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

export interface IPostsHapi {
  _id: object;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  comments?: {
    _id: string;
    content: string;
    userId: string;
  }[];
}

export interface IFeedPosts extends IPostsSchema {
  creatorDetails: {
    firstName: string;
    lastName: string;
    friends: string[];
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;

  numComments: number;
}

export interface ICommentsPayload {
  content: string;
  userId: string;
}

export interface IComments extends ICommentsPayload {
  _id: object;
}
