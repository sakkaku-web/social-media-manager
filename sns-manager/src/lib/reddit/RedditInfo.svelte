<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import ExternalLink from "../components/ExternalLink.svelte";
  import type { Token } from "../auth";
  import { RedditClient } from "./reddit";
  import { removeLoginToken, updateLoginToken } from "../../storage";

  export let token: Token;

  let username: string;
  let api: RedditClient;

  $: loadUserData(token);


  const loadUserData = async (token: Token) => {
    api = new RedditClient(token.token);
    const user = await api.getUser();
    if (user == null) {
      await tryRefreshToken(token);
    } else {
      username = user.name;
    }
  };


</script>

{#if username}
  <div class="flex flex-col gap-2 h-full overflow-hidden">
    <div class="flex justify-between items-center gap-2">
      <ExternalLink url={`https://reddit.com/u/${username}`}
        >Reddit - {username}</ExternalLink
      >
      <button class="font-bold" on:click={() => removeToken()}>x</button>
    </div>

    <slot {api} {username} />
  </div>
{/if}
