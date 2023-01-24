import Author from "../types/author";
import Media from "../types/media";
import PostType from "../types/post";
import { Asset, BlogAuthor, Blogpost, BlogpostsResult } from "../types/sitecore";

const POST_GRAPHQL_FIELDS = `
__typename
total
results {
  id
  Title: title
  Abstract: abstract
  Body: body
  PublishDate: publishdate
  CoverImage: coverImage {
    results {
            fileId
            ... on Media {
              Url: fileUrl
              Name: fileName
              Width:fileWidth
              Height: fileHeight
            }
          }}
  Author: author {
    results {
      ... on Author {
        Name: fullname
        ProfilePictureUrl: profilepicture {
          total
          results {
            fileId
            ... on Media {
              Url: fileUrl
              Name: fileName
              Width:fileWidth
              Height: fileHeight
            }
          }
        }
      }
    }
  }
  Categories: categories {
    results {
      ... on Category {
        Name: categoryName
      }
    }
  }
}
`;

async function fetchAPI(query: string) {
  return fetch(process.env.SITECORE_ENDPOINT_URL as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-GQL-Token": process.env.SITECORE_DEV_AUTH_TOKEN as string,
    },
    body: JSON.stringify({ query }),
  }).then((response) => response.json());
}

export async function getAllPosts(preview: boolean): Promise<PostType[]> {
  const data = await fetchAPI(
    `{ 
      data: allBlogpost
      {
        ${POST_GRAPHQL_FIELDS}
      }
    }`
  );
  return extractPosts(data.data);
}

export async function getAllPostsWithSlug(): Promise<PostType[]> {
  const data = await fetchAPI(
    `{ 
      data: allBlogpost(where: { id_neq : null } )
      {
        ${POST_GRAPHQL_FIELDS}
      }
    }`
  );
  return extractPosts(data.data);
}

export async function getPostBySlug(slug: string): Promise<PostType> {
  const data = await fetchAPI(
    `{ 
      data: allBlogpost(where: { id_eq: "${slug}" })
      {
        ${POST_GRAPHQL_FIELDS}
      }
    }`
  );
  return extractPost(data.data);
}

function extractPost({ data }: { data: BlogpostsResult }) {
  return parsePost(data.results[0]);
}

function extractPosts({ data }: { data: BlogpostsResult }) {
  return data.results.map((post: Blogpost) => {
    return parsePost(post);
  });
}

function parseAuthor(author: BlogAuthor): Author {
  return {
    name: author.Name,
    picture: parseMedia(author.ProfilePictureUrl.results[0]),
  };
}

function parsePost(post: Blogpost): PostType {
  return {
    title: post.Title,
    slug: post.id,
    date: post.PublishDate.toString(),
    content: post.Body,
    excerpt: post.Abstract ? post.Abstract : "",
    coverImage: parseMedia(post.CoverImage.results[0]),
    author: parseAuthor(post.Author.results[0]),
    ogImage: {
      url: "",
    },
  };
}

function parseMedia(asset: Asset): Media {
  return {
    Url: asset.Url,
    Name: asset.Name,
    Width: asset.Width,
    Height: asset.Height,
  };
}
