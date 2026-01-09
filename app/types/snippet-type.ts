import { ObjectId } from "mongodb";

export type Snippet = {
  _id: ObjectId | string;
  title: string;
  code: string;
  language? : string
  tags: string[];
  userId: ObjectId | string;
  createdAt: Date;
  updatedAt: Date;
};
