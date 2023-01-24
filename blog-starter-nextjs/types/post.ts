import { JSONContent } from "@tiptap/core";
import Author from "./author";
import Media from "./media";

type PostType = {
  slug: string;
  title: string;
  date: string;
  coverImage: Media;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: JSONContent;
};

export default PostType;
