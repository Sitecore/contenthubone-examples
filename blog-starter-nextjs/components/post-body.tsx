import { JSONContent } from "@tiptap/core";
import { generateHTML } from "@tiptap/html";
import { useMemo } from "react";
import { richTextProfile } from "../lib/richTextConfiguration";

type Props = {
  content: JSONContent;
};

const PostBody = ({ content }: Props) => {
  const output = generateHTML(content, [richTextProfile]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="prose" dangerouslySetInnerHTML={{ __html: output }}></div>
    </div>
  );
};

export default PostBody;
