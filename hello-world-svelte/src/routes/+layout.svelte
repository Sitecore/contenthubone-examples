<script>
  import "./styles.css";
  import QuickLinks from "./quickLinks.svelte";
  import sitecoreLogo from "$lib/images/sitecore.svg";
  import contenthuboneLogo from "$lib/images/contenthubone.svg";
</script>

<div class="app">
  <div class="top">
    <div>
      <a href="https://developers.sitecore.com" target="_blank" rel="noopener noreferrer">
        <img src={sitecoreLogo} alt="Sitecore Logo" width={222} height={30} />
      </a>
    </div>
    <div class="right">
      <a
        href="https://developers.sitecore.com/content-management/content-hub-one"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={contenthuboneLogo} alt="Sitecore Logo" width={222} height={30} />
      </a>
    </div>
  </div>

  <main>
    <div class="center">
      <slot />
    </div>

    <QuickLinks />
  </main>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 64rem;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>
