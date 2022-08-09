<script lang="ts">
  import "./global.css";
  import LoginButton from "./lib/LoginButton.svelte";
  import type { OAuthToken, TwitterToken } from "./openapi";

  let twitterLogins: TwitterToken[] = [];
  let redditLogins: OAuthToken[] = [];
  let pixivLogins: OAuthToken[] = [];
  let pinterestLogins: OAuthToken[] = [];
</script>

<main class="h-full flex flex-col items-center">
  <div class="flex flex-row gap-4 font-bold">
    <LoginButton
      provider="Twitter"
      on:login={(e) => (twitterLogins = e.detail.tokens)}
    />

    <LoginButton
      provider="Reddit"
      on:login={(e) => (redditLogins = e.detail.tokens)}
    />

    <LoginButton
      provider="Pinterest"
      on:login={(e) => (pinterestLogins = e.detail.tokens)}
    />
  </div>

  <h1>Twitter</h1>
  {#each twitterLogins as login}
    {login.accessToken}
  {/each}

  <h1>Reddit</h1>
  {#each redditLogins as login}
    {login.accessToken}
  {/each}

  <h1>Pixiv</h1>
  {#each pixivLogins as login}
    {login.accessToken}
  {/each}

  <h1>Pinterest</h1>
  {#each pinterestLogins as login}
    {login.accessToken}
  {/each}
</main>

<style>
</style>
