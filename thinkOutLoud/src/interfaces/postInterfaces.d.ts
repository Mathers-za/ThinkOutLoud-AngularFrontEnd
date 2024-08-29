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
