<script lang="ts">
  import "./global.css";
  import LoginButton from "./lib/LoginButton.svelte";
  import PixivLogin from "./lib/PixivLogin.svelte";
  import PinterestInfo from "./lib/PinterestInfo.svelte";
  import RedditInfo from "./lib/RedditInfo.svelte";
  import TwitterInfo from "./lib/TwitterInfo.svelte";
  import { OAuthToken, TwitterToken } from "./openapi";

  let twitterLogins: TwitterToken[] = [];
  let redditLogins: OAuthToken[] = [];
  let pixivLogins: OAuthToken[] = [];
  let pinterestLogins: OAuthToken[] = [];
</script>

<main class="h-full flex flex-col">
  <div class="flex flex-row justify-center gap-4 border-b">
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

    <PixivLogin on:login={(e) => (pixivLogins = e.detail.tokens)} />
  </div>

  <div class="flex flex-col items-center">
    {#if twitterLogins.length}
      <h1 class="font-bold">Twitter</h1>
    {/if}
    {#each twitterLogins as login}
      <TwitterInfo token={login} />
    {/each}

    {#if redditLogins.length}
      <h1 class="font-bold">Reddit</h1>
    {/if}
    {#each redditLogins as login}
      <RedditInfo token={login} />
    {/each}

    {#if pixivLogins.length}
      <h1 class="font-bold">Pixiv</h1>
    {/if}
    {#each pixivLogins as login}
      {login.accessToken}
    {/each}

    {#if pinterestLogins.length}
      <h1 class="font-bold">Pinterest</h1>
    {/if}
    {#each pinterestLogins as login}
      <PinterestInfo token={login} />
    {/each}
  </div>
</main>

<style>
</style>
