<script lang="ts">
  import "./global.css";
  import RedditLogin from "./lib/RedditLogin.svelte";
  import TwitterLogin from "./lib/TwitterLogin.svelte";
  import type { OAuthToken, TwitterToken } from "./openapi";

  let twitterLogins: TwitterToken[] = [];
  let redditLogins: OAuthToken[] = [];
  let pixivLogins: OAuthToken[] = [];
</script>

<main class="h-full flex flex-col items-center">
  <div class="flex flex-row gap-4 font-bold">
    <TwitterLogin bind:twitterLogins />
    <RedditLogin bind:redditLogins />
  </div>

  <h1>Twitter</h1>
  {#each twitterLogins as login}
    {JSON.stringify(login)}
  {/each}

  <h1>Reddit</h1>
  {#each redditLogins as login}
    {JSON.stringify(login)}
  {/each}

  <h1>Pixiv</h1>
  {#each pixivLogins as login}
    {JSON.stringify(login)}
  {/each}
</main>

<style>
</style>
