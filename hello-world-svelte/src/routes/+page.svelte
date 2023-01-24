<script>
  import { env } from "$env/dynamic/public";

  //const ENDPOINT_URL = "https://content-api.sitecorecloud.io/api/content/v1/preview/graphql";
  //const API_KEY = "MHFLeXZ5UU5ac2E2bXV3alhRZCtEOWRJTG5NbXRUOS9JMWFrNWt2YisxZz18aGMtZGVtby03YTcwYg==";

  const ENDPOINT_URL = env.PUBLIC_SITECORE_PREVIEW_ENDPOINT_URL;
  const API_KEY = env.PUBLIC_PREVIEW_API_KEY;

  const query = `{ 
        articles: allSampleArticle
        {
         results {
            title
            summary
         }
        }
      }`;

  const results = fetch(ENDPOINT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-GQL-Token": API_KEY,
    },
    body: JSON.stringify({ query }),
  }).then((response) => response.json());
</script>

{#await results}
  <p>.. loading</p>
{:then data}
  <h1>{data.data.articles.results[0].title}</h1>
  <p>{data.data.articles.results[0].summary}</p>
{:catch e}
  {e}
{/await}
