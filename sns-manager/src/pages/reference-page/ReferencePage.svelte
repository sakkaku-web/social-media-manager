<script lang="ts">
  import TokenContainer from "../../lib/forms/TokenContainer.svelte";
  import type { OAuthToken } from "src/openapi";
  import RedditReference from "./RedditReference.svelte";
  import RedditInfo from "../../lib/RedditInfo.svelte";

  export let redditLogins: OAuthToken[] = [];
</script>

<div class="flex flex-col">
  {#each redditLogins as login}
    <RedditInfo token={login} let:api>
      <RedditReference {api} />
    </RedditInfo>
  {/each}
</div>
