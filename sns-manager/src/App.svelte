<script lang="ts">
  import { onMount } from "svelte";
  import "./global.css";
  import type { Token } from "./lib/auth";
  import LoginButton from "./lib/LoginButton.svelte";
  import PixivLogin from "./lib/PixivLogin.svelte";
  import ReferencePage from "./pages/ReferencePage.svelte";
  import { loadLoginTokens } from "./storage";

  let twitterLogins: Token[] = [];
  let redditTokens: Token[] = [];
  let pixivLogins: Token[] = [];
  let pinterestLogins: Token[] = [];

  const loadTokens = () => {
    twitterLogins = loadLoginTokens("twitter");
    redditTokens = loadLoginTokens("reddit");
    pixivLogins = loadLoginTokens("pixiv");
    pinterestLogins = loadLoginTokens("pinterest");
  };

  console.log("%c THIS IS A WARNING ", "color: #bc3939; font-size: 16px");
  console.log(
    "%c Be careful when executing something in here. It's possible to get your account information",
    "color: #bc3939; font-size: 14px"
  );

  onMount(() => loadTokens());
</script>

<div class="h-full flex flex-col">
  <header class="flex flex-row justify-center gap-4 border-b p-2">
    <LoginButton provider="twitter" on:login={() => loadTokens()} />
    <LoginButton provider="reddit" on:login={() => loadTokens()} />
    <LoginButton provider="pinterest" on:login={() => loadTokens()} />
    <PixivLogin on:login={() => loadTokens()} />
  </header>

  <main class="p-4">
    <ReferencePage tokens={redditTokens} on:refresh={() => loadTokens()} />
  </main>
</div>

<style>
</style>
