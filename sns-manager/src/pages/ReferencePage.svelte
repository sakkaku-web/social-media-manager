<script lang="ts">
  import RedditReference from "../lib/reddit/RedditReference.svelte";
  import RedditInfo from "../lib/reddit/RedditInfo.svelte";
  import type { Token } from "src/lib/auth";
  import PixivInfo from "../lib/pixiv/PixivInfo.svelte";
  import PixivReference from "../lib/pixiv/PixivReference.svelte";

  export let redditTokens: Token[] = [];
  export let pixivTokens: Token[] = [];
</script>

<div class="flex flex-col">
  {#each redditTokens as login}
    <RedditInfo token={login} on:refresh let:api let:username>
      <RedditReference {api} {username} />
    </RedditInfo>
  {/each}

  {#each pixivTokens as login}
    <PixivInfo token={login} on:refresh let:api>
      <PixivReference {api} userId={login.userId} />
    </PixivInfo>
  {/each}
</div>
