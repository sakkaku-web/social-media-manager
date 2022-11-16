<script lang="ts">
  import { onMount } from "svelte";

  import ExternalLink from "../components/ExternalLink.svelte";
  import Card from "../components/Card.svelte";
  import type { Token } from "../auth";
  import { RedditClient } from "./reddit";

  export let token: Token;

  let username: string;

  const api = new RedditClient(token.token);

  onMount(async () => {
    const user = await api.getUser();
    if (user == null) {
      // const newToken = await api.redditRefreshRefreshPost({
      //   refreshToken: { refreshToken: token.refreshToken },
      // });
    } else {
      username = user.name;
    }
  });
</script>

{#if username}
  <Card>
    <ExternalLink url={`https://reddit.com/u/${username}`}
      >Reddit - {username}</ExternalLink
    >

    <slot {api} {username} />
  </Card>
{/if}
