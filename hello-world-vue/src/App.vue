<script lang="ts">
import QuickLinks from './components/QuickLinks.vue'

const ENDPOINT_URL = import.meta.env.VITE_SITECORE_PREVIEW_ENDPOINT_URL;
const API_KEY = import.meta.env.VITE_PREVIEW_API_KEY;

 export default {
    data: () => ({
        title: '',
        summary: ''
    }),

    components: {
      QuickLinks,
    },

    created() {
      // fetch on init
      this.fetchData()
    },
    methods: {
      async fetchData() {
        const query = `{ 
            articles: allSampleArticle {
                results {
                  title
                  summary
                }
              }
            }`;

        const results = await fetch(ENDPOINT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-GQL-Token": API_KEY,
          },
          body: JSON.stringify({ query }),
        }).then((response) => response.json());

        this.title = results.data.articles.results[1].title;
        this.summary = results.data.articles.results[1].summary;

      }
    },
    mounted() {
      this.getData()
    }
  }
 
</script>

<template>
   <div class="app">
      <div class="top">
        <div>
          <a href="https://developers.sitecore.com" target="_blank" rel="noopener noreferrer">
          
            <img src="@/assets/sitecore.svg" alt="Sitecore Logo" width="222" height="30" />
          </a>
        </div>
        <div class="right">
          <a href="https://developers.sitecore.com/content-management/content-hub-one" target="_blank" rel="noopener noreferrer">
            <img src="@/assets/contenthubone.svg" alt="Sitecore Logo" width="222" height="30" />
          </a>
        </div>
      </div>

      <main>
        <div class="center">
          <h1>{{ title}}</h1>
          <p>{{ summary }}</p>
        </div>

        <QuickLinks />
      </main>
     
    </div>

</template>

<style scoped>

</style>
