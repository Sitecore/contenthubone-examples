import { JSONContent } from "@tiptap/core";
export type Blogpost = {
  id: string;
  Title: string;
  Abstract?: string;
  Body: JSONContent;
  Author: AuthorResults;
  Categories: CategoryResults;
  PublishDate: Date;
  CoverImage: AssetResults;
};

//export type RichText = {
//  type: string;
//  content: TypedObject[];
//};

export type Asset = {
  Url: string;
  Name: string;
  Width: string;
  Height: string;
};

export type AssetResults = {
  total: string;
  results: Asset[];
};

export type BlogpostsResult = {
  total: string;
  results: Blogpost[];
};

export type CategoryResults = {
  results: Category[];
};
export type Category = {
  Name: string;
};

export type AuthorResults = {
  results: BlogAuthor[];
};

export type BlogAuthor = {
  Name: string;
  ProfilePictureUrl: AssetResults;
};
