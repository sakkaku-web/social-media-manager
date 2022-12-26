<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import ExternalLink from "../components/ExternalLink.svelte";
  import type { Token } from "../auth";
  import { Twitter2Client } from "./twitter2";
  import { removeLoginToken, updateLoginToken } from "../../storage";
  import Button from "../components/Button.svelte";

  export let token: Token;

  let username: string;
  let api: Twitter2Client;

  $: loadUserData(token);

  const dispatch = createEventDispatcher();

  const loadUserData = async (token: Token) => {
    api = new Twitter2Client(token.token);
    const user = await api.getUser();
    if (user == null) {
      await tryRefreshToken(token);
    } else {
      username = user.name;
    }
  };

  const tryRefreshToken = async (token: Token) => {
    // if (token.refreshToken) {
    //   console.log("Refreshing reddit token");
    //   const newToken = await api.refreshToken(token.refreshToken);
    //   if (newToken) {
    //     token = updateLoginToken(token, newToken, "reddit");
    //     if (token) {
    //       dispatch("refresh");
    //     } else {
    //       console.log("Failed to read token");
    //       removeToken();
    //     }
    //   } else {
    //     console.log("Failed to get new token. Removing current token");
    //     removeToken();
    //   }
    // }
  };

  const removeToken = () => {
    removeLoginToken(token, "twitter2");
    dispatch("refresh");
  };
</script>

{#if username}
  <div class="flex flex-col gap-2">
    <div class="flex justify-between">
      <!-- <ExternalLink url={`https://reddit.com/u/${username}`}
        >Reddit - {username}</ExternalLink
      > -->
      Twitter2 - {username}
      <Button on:click={() => removeToken()}>x</Button>
    </div>

    <slot {api} />
  </div>
{/if}
