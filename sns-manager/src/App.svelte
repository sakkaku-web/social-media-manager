<script lang="ts">
  import { onMount } from "svelte";
  import "./global.css";
  import type { Token } from "./lib/auth";
  import LoginButton from "./lib/LoginButton.svelte";
  import PixivLogin from "./lib/PixivLogin.svelte";
  import RedditInfo from "./lib/reddit/RedditInfo.svelte";
  import RedditReference from "./lib/reddit/RedditReference.svelte";
  import TwitterReference from "./lib/twitter/TwitterReference.svelte";
  import TwitterRefSetting from "./lib/twitter/TwitterRefSetting.svelte";
  import TwitterUserRef from "./lib/twitter/TwitterUserRef.svelte";
  import { loadLoginTokens } from "./storage";

  let twitterTokens: Token[] = [];
  let redditTokens: Token[] = [];
  let pixivTokens: Token[] = [];
  let pinterestLogins: Token[] = [];

  let sidebarOpen = false;

  let users: string[] = [];
  let focused: string;

  const onFocus = (user: string) => {
    focused = user;
  };

  const onUnfocus = () => (focused = undefined);

  // TODO: move somewhere else
  const userListKey = "sns-manager-twitter-reference-users";
  onMount(async () => {
    users = JSON.parse(localStorage.getItem(userListKey) || "[]");
  });

  const removeTwitterUser = (user: string) => {
    users = users.filter((u) => u !== user);
    localStorage.setItem(userListKey, JSON.stringify(users));
  };

  const addTwitterUser = (user: string) => {
    users = [...users, user];
    localStorage.setItem(userListKey, JSON.stringify(users));
  };

  const loadTokens = () => {
    twitterTokens = loadLoginTokens("twitter");
    redditTokens = loadLoginTokens("reddit");
    pixivTokens = loadLoginTokens("pixiv");
    pinterestLogins = loadLoginTokens("pinterest");
  };

  onMount(() => loadTokens());
</script>

<div class="h-full flex flex-col">
  <header class="flex flex-row justify-center gap-4 border-b p-2">
    <button on:click={() => (sidebarOpen = !sidebarOpen)}>Open Sidebar</button>
    <LoginButton provider="twitter" on:login={() => loadTokens()} />
    <LoginButton provider="reddit" on:login={() => loadTokens()} />
    <LoginButton provider="pinterest" on:login={() => loadTokens()} />
    <PixivLogin on:login={() => loadTokens()} />
  </header>

  <div
    class={"absolute inset-y-0 left-0 bg-red-300 w-80 " +
      (sidebarOpen ? "block" : "hidden")}
  >
    <button on:click={() => (sidebarOpen = false)}>x</button>

    <TwitterRefSetting on:add={(e) => addTwitterUser(e.detail.user)} />
  </div>

  <main class="p-4 flex">
    <div class="flex grow">
      {#each users as user (user)}
        <TwitterUserRef
          {user}
          {focused}
          on:remove={() => removeTwitterUser(user)}
          on:focus={() => onFocus(user)}
          on:unfocus={() => onUnfocus()}
        />
      {/each}

      {#each redditTokens as token}
        <RedditReference
          {token}
          {focused}
          on:focus={(e) => onFocus(e.detail.username)}
          on:unfocus={() => onUnfocus()}
        />
      {/each}
    </div>
  </main>
</div>

<style>
</style>
