<script lang="ts">
  import "./global.css";
  import LoginButton from "./lib/LoginButton.svelte";
  import PixivLogin from "./lib/PixivLogin.svelte";
  import { OAuthToken, PixivToken, TwitterToken } from "./openapi";
  import ReferencePage from "./pages/reference-page/ReferencePage.svelte";

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

  <main class="p-4">
    <ReferencePage {redditLogins} />
  </main>
</div>

<style>
</style>
