<script lang="ts">
  import RedditReference from "../lib/reddit/RedditReference.svelte";
  import RedditInfo from "../lib/reddit/RedditInfo.svelte";
  import type { Token } from "src/lib/auth";

  export let tokens: Token[] = [];
</script>

<div class="flex flex-col">
  {#each tokens as login}
    <RedditInfo token={login} on:refresh let:api let:username>
      <RedditReference {api} {username} />
    </RedditInfo>
  {/each}
</div>
