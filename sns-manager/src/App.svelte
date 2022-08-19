<script lang="ts">
  import "./global.css";
  import LoginButton from "./lib/LoginButton.svelte";
  import PixivLogin from "./lib/PixivLogin.svelte";
  import PinterestInfo from "./lib/PinterestInfo.svelte";
  import RedditInfo from "./lib/RedditInfo.svelte";
  import TwitterInfo from "./lib/TwitterInfo.svelte";
  import { OAuthToken, PixivToken, TwitterToken } from "./openapi";
  import PixivInfo from "./lib/PixivInfo.svelte";
  import TokenContainer from "./lib/forms/TokenContainer.svelte";

  let twitterLogins: TwitterToken[] = [];
  let redditLogins: OAuthToken[] = [];
  let pixivLogins: PixivToken[] = [];
  let pinterestLogins: OAuthToken[] = [];

  console.log("%c THIS IS A WARNING ", "color: #bc3939; font-size: 16px");
  console.log(
    "%c Be careful when executing something in here. It's possible to get your account information",
    "color: #bc3939; font-size: 14px"
  );
</script>

<div class="h-full flex flex-col">
  <header class="flex flex-row justify-center gap-4 border-b p-2">
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
  </header>

  <main class="flex flex-row p-4">
    <div class="flex flex-col gap-8">
      {#if twitterLogins.length}
        <TokenContainer title="Twitter">
          {#each twitterLogins as login}
            <TwitterInfo token={login} />
          {/each}
        </TokenContainer>
      {/if}

      {#if redditLogins.length}
        <TokenContainer title="Reddit">
          {#each redditLogins as login}
            <RedditInfo token={login} />
          {/each}
        </TokenContainer>
      {/if}

      {#if pixivLogins.length}
        <TokenContainer title="Pixiv">
          {#each pixivLogins as login}
            <PixivInfo token={login} />
          {/each}
        </TokenContainer>
      {/if}

      {#if pinterestLogins.length}
        <TokenContainer title="Pinterest">
          {#each pinterestLogins as login}
            <PinterestInfo token={login} />
          {/each}
        </TokenContainer>
      {/if}
    </div>
  </main>
</div>

<style>
</style>
