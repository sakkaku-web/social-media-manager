<script lang="ts">
  import RedditReference from "../lib/reddit/RedditReference.svelte";
  import RedditInfo from "../lib/reddit/RedditInfo.svelte";
  import type { Token } from "src/lib/auth";

  export let redditLogins: Token[] = [];
</script>

<div class="flex flex-col">
  {#each redditLogins as login}
    <RedditInfo token={login} let:api let:username>
      <RedditReference {api} {username} />
    </RedditInfo>
  {/each}
</div>
