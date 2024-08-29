export interface IPostsSchema {
  creatorId: Schema.Types.ObjectId;

  content: string;
  likes?: Schema.Types.ObjectId[];
  comments?: {
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
    commentatorId: Schema.Types.ObjectId[];
  };
}
