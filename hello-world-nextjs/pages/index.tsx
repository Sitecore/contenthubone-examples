import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

type Props = {
  article: any;
};

const Index = ({ article }: Props) => {
  return (
    <>
      <Head>
        <title>Content Hub ONE Example</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.top}>
        <div>
          <a href="https://developers.sitecore.com" target="_blank" rel="noopener noreferrer">
            <Image src="/contenthubone.svg" alt="Sitecore Logo" width={222} height={30} priority />
          </a>
        </div>
        <div className={styles.right}>
          <a href="https://developers.sitecore.com" target="_blank" rel="noopener noreferrer">
            <Image src="/sitecore.svg" alt="Sitecore Logo" width={222} height={30} priority />
          </a>
        </div>
      </div>

      <main className={styles.main}>
        <div className={styles.center}>
          <h1>{article.title}</h1>
          <p>{article.summary}</p>
        </div>
        <div className={styles.grid}>
          <a
            href="https://doc.sitecore.com/ch-one/en/users/content-hub-one/working-with-content-hub-one.html"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              End User Docs <span>-&gt;</span>
            </h2>
            <p>Find information on how to work with Content Hub ONE.</p>
          </a>

          <a
            href="https://doc.sitecore.com/ch-one/en/developers/content-hub-one/content-hub-one-sdk.html"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              SDK <span>-&gt;</span>
            </h2>
            <p>The Content Hub ONE client SDK provides a unified set of APIs and tools that let you develop apps.</p>
          </a>

          <a
            href="https://doc.sitecore.com/ch-one/en/developers/content-hub-one/content-hub-one-cli.html"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              CLI <span>-&gt;</span>
            </h2>
            <p>Manage content and media with the CLI</p>
          </a>

          <a
            href="https://doc.sitecore.com/ch-one/en/developers/content-hub-one/graphql--preview-and-delivery-apis.html"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              APIs <span>-&gt;</span>
            </h2>
            <p>Use GraphQL to query your Content Hub ONE endpoint.</p>
          </a>
        </div>
      </main>
    </>
  );
};

export default Index;

export async function getStaticProps({ preview = false }) {
  const article = await getArticle(preview);
  return {
    props: { article, preview },
  };
}

async function fetchAPI(query: string) {
  return fetch(process.env.SITECORE_PREVIEW_ENDPOINT_URL as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-GQL-Token": process.env.PREVIEW_API_KEY as string,
    },
    body: JSON.stringify({ query }),
  }).then((response) => response.json());
}

export async function getArticle(preview: boolean) {
  const result = await fetchAPI(
    `{ 
        articles: allSampleArticle
        {
         results {
            title
            summary
         }
        }
      }`
  );
  return result.data.articles.results[0];
}
