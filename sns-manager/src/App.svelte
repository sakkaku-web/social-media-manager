<script lang="ts">
  import "./global.css";
  import LoginButton from "./lib/LoginButton.svelte";
  import PixivLogin from "./lib/PixivLogin.svelte";
  import PinterestInfo from "./lib/PinterestInfo.svelte";
  import RedditInfo from "./lib/RedditInfo.svelte";
  import TwitterInfo from "./lib/TwitterInfo.svelte";
  import { OAuthToken, PixivToken, TwitterToken } from "./openapi";
  import PixivInfo from "./lib/PixivInfo.svelte";

  let twitterLogins: TwitterToken[] = [];
  let redditLogins: OAuthToken[] = [];
  let pixivLogins: PixivToken[] = [];
  let pinterestLogins: OAuthToken[] = [];
</script>

<main class="h-full flex flex-col gap-8">
  <div class="flex flex-row justify-center gap-4 border-b p-2">
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

  <div class="flex flex-col items-center gap-8">
    {#if twitterLogins.length}
      <div class="flex flex-col gap-2 items-center">
        <h1 class="font-bold">Twitter</h1>
        {#each twitterLogins as login}
          <TwitterInfo token={login} />
        {/each}
      </div>
    {/if}

    {#if redditLogins.length}
      <div class="flex flex-col gap-2 items-center">
        <h1 class="font-bold">Reddit</h1>
        {#each redditLogins as login}
          <RedditInfo token={login} />
        {/each}
      </div>
    {/if}

    {#if pixivLogins.length}
      <div class="flex flex-col gap-2 items-center">
        <h1 class="font-bold">Pixiv</h1>
        {#each pixivLogins as login}
          <PixivInfo token={login} />
        {/each}
      </div>
    {/if}

    {#if pinterestLogins.length}
      <div class="flex flex-col gap-2 items-center">
        <h1 class="font-bold">Pinterest</h1>
        {#each pinterestLogins as login}
          <PinterestInfo token={login} />
        {/each}
      </div>
    {/if}
  </div>
</main>

<style>
</style>
