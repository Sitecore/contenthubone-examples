// preview endpoint by default
const ENDPOINT_URL =
  "https://content-api.sitecorecloud.io/api/content/v1/preview/graphql/";

// fill in your API Key for the endpoint you selected above
const API_KEY = "";

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

const contentTitle = document.querySelector("#content-title");

if (API_KEY === "") contentTitle.innerHTML = "Set your API key!";

results.then((result) => {
  const latestArticle = result.data.articles.results[0];
  contentTitle.innerHTML = latestArticle.title;
  document.querySelector("#content-summary").innerHTML = latestArticle.summary;
});
